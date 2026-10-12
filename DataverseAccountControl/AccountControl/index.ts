import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";

import {
    AccountManager,
    IAccount
} from "./components/AccountManager";

export class AccountControl
    implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container!: HTMLDivElement;
    private context!: ComponentFramework.Context<IInputs>;
    private root!: Root;

    private accounts: IAccount[] = [];

    private accountName = "";
    private phone = "";

    private isLoading = false;
    private errorMessage = "";

    // Initialize the PCF control
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {

        this.context = context;
        this.container = container;

        this.root = createRoot(this.container);

        // Render UI immediately instead of waiting for Dataverse
        this.render();

        // Retrieve records after the initial render
        void this.loadAccounts();
        this.accounts = [
    {
        accountid: "sample-001",
        name: "Contoso Ltd",
        telephone1: "9876543210"
    },
    {
        accountid: "sample-002",
        name: "Fabrikam Ltd",
        telephone1: "9876501234"
    }
];

this.render();
    }

    // READ: Retrieve Account records
    private async loadAccounts(): Promise<void> {

        this.isLoading = true;
        this.errorMessage = "";
        this.render();

        try {

            const result =
                await this.context.webAPI.retrieveMultipleRecords(
                    "account",
                    "?$select=accountid,name,telephone1&$top=20"
                );

            this.accounts = result.entities as IAccount[];

        } catch (error) {

            console.error("Error loading accounts:", error);

            this.errorMessage = this.getErrorMessage(error);

        } finally {

            this.isLoading = false;
            this.render();

        }
    }

    // CREATE: Add an Account
    private async addAccount(): Promise<void> {

        if (!this.accountName.trim()) {

            this.errorMessage = "Please enter an Account Name.";
            this.render();
            return;
        }

        try {

            this.errorMessage = "";
            this.render();

            const data = {
                name: this.accountName.trim(),
                telephone1: this.phone.trim()
            };

            await this.context.webAPI.createRecord(
                "account",
                data
            );

            this.accountName = "";
            this.phone = "";

            await this.loadAccounts();

        } catch (error) {

            console.error("Error creating account:", error);

            this.errorMessage = this.getErrorMessage(error);
            this.render();

        }
    }

    // DELETE: Delete an Account
    private async deleteAccount(id: string): Promise<void> {

        const confirmed = window.confirm(
            "Are you sure you want to delete this account?"
        );

        if (!confirmed) {
            return;
        }

        try {

            this.errorMessage = "";
            this.render();

            await this.context.webAPI.deleteRecord(
                "account",
                id
            );

            await this.loadAccounts();

        } catch (error) {

            console.error("Error deleting account:", error);

            this.errorMessage = this.getErrorMessage(error);
            this.render();

        }
    }

    // Convert an error into a readable message
    private getErrorMessage(error: unknown): string {

        if (error instanceof Error) {
            return error.message;
        }

        return "An unexpected error occurred. Check the browser console.";
    }

    // Render the React component
    private render(): void {

        if (!this.root) {
            return;
        }

        this.root.render(
            React.createElement(AccountManager, {

                accounts: this.accounts, //Dataverse - Account Table - $select=accountid,name,telephone1&$top=20

                accountName: this.accountName,

                phone: this.phone,

                onAccountNameChange: (value: string) => {

                    this.accountName = value;
                    this.render();

                },

                onPhoneChange: (value: string) => {

                    this.phone = value;
                    this.render();

                },

                onAdd: () => {

                    void this.addAccount();

                },

                onDelete: (id: string) => {

                    void this.deleteAccount(id);

                }

            })
        );

        // Show status and errors independently of Dataverse
        const status = this.container.querySelector(
            "[data-pcf-status]"
        );

        if (status) {
            status.textContent = this.isLoading
                ? "Loading accounts..."
                : this.errorMessage;
        }
    }

    // Called when Power Apps updates the control
    public updateView(
        context: ComponentFramework.Context<IInputs>
    ): void {

        this.context = context;

    }

    // No output properties are used
    public getOutputs(): IOutputs {

        return {};

    }

    // Clean up React resources
    public destroy(): void {

        if (this.root) {
            this.root.unmount();
        }
    }
}

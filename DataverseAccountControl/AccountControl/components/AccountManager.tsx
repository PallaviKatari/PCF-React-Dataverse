import * as React from "react";
import {
  Button,
  Field,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title3
} from "@fluentui/react-components";

export interface IAccount {
  accountid: string;
  name: string;
  telephone1?: string;
}

export interface IAccountManagerProps {
  accounts: IAccount[];
  accountName: string;
  phone: string;
  onAccountNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export const AccountManager: React.FC<IAccountManagerProps> = (props) => {

  return (
    <div style={{ padding: "20px" }}>

      <Title3>Dataverse Account Manager</Title3>

      <div style={{ marginTop: "20px" }}>

        <Field label="Account Name">
          <Input
            value={props.accountName}
            onChange={(e) =>
              props.onAccountNameChange(e.target.value)
            }
          />
        </Field>

        <br />

        <Field label="Phone">
          <Input
            value={props.phone}
            onChange={(e) =>
              props.onPhoneChange(e.target.value)
            }
          />
        </Field>

        <br />

        <Button
          appearance="primary"
          onClick={props.onAdd}
        >
          Add Account
        </Button>

      </div>

      <div style={{ marginTop: "30px" }}>

        <Table>

          <TableHeader>
            <TableRow>
              <TableHeaderCell>Account Name</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>

            {props.accounts.map((account) => (

              <TableRow key={account.accountid}>

                <TableCell>
                  {account.name}
                </TableCell>

                <TableCell>
                  {account.telephone1}
                </TableCell>

                <TableCell>

                  <Button
                    onClick={() =>
                      props.onDelete(account.accountid)
                    }
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

    </div>
  );
};
# Dataverse Account Manager

This repository contains a Power Apps Component Framework (PCF) control and a matching Dataverse solution project for managing Account records in Dataverse.

## Project structure

- `DataverseAccountControl/` - The PCF control project
  - `AccountControl/ControlManifest.Input.xml` - PCF control manifest
  - `AccountControl/index.ts` - Control lifecycle and Dataverse Web API integration
  - `AccountControl/components/AccountManager.tsx` - React-based UI for adding and deleting accounts
- `DataverseAccountSolution/` - Dataverse solution project for packaging and deployment

## What the control does

The control provides a simple Dataverse Account manager with:

- Loading Account records from Dataverse
- Creating a new Account record
- Deleting an Account record
- Displaying account name and phone number in a Fluent UI table

It uses the Dataverse Web API (`context.webAPI`) and is intended for use in a Dataverse form or a PCF-enabled environment.

## Prerequisites

Before building the PCF project, make sure you have:

- Node.js 18+ or later
- npm
- Power Platform CLI (`pac`) for preparing and packaging Dataverse solution projects
- Access to a Dataverse environment with sufficient permissions to create and delete Account records

## Install dependencies

From the `DataverseAccountControl` folder:

```bash
npm install
```

## Build the PCF control

```bash
npm run build
```

Useful scripts:

```bash
npm run start
npm run start:watch
npm run lint
npm run clean
npm run rebuild
```

## Run locally

Use the local PCF test harness:

```bash
npm run start
```

This launches the component in a local development environment for testing UI behavior.

## Package and deploy the solution

The Dataverse solution project is under `DataverseAccountSolution/` and is used to package and deploy the control through the Power Platform solution pipeline.

Typical workflow:

1. Build the PCF project
2. Update the solution/project configuration if needed
3. Use Power Platform CLI or Visual Studio to build and package the solution
4. Import the managed or unmanaged solution into your Dataverse environment

## Notes

- The control requires the `WebAPI` feature in `ControlManifest.Input.xml`.
- The main data operations are performed against the `account` table.
- The current implementation is focused on Account management and can be extended for validation, editing, or additional fields.

## Suggested next enhancements

- Add edit support for existing Accounts
- Add sorting or filtering
- Add inline validation for required fields
- Add a custom property or field mapping for a specific Dataverse column
- Add styling to better match your organization’s design system

## License

This project is intended for internal or demonstration use unless otherwise specified by your organization or customer requirements.

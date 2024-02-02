# Mini-trello = Task management

Trello clone using Nextjs, Shadcn-ui and zustand

## How to run

- Install pnpm: `npm install -g pnpm`
- Instal packages: `pnpm install`
- Create .env file and add: `URL = http://localhost:3000`
- Run the server: `pnpm dev`

## How it works

- A personal workspace is created for one user
- Simple Cookie auth is used
- If the name matches then old workspace will be opened else new is created
- All is done using JSON-like objects (no database) so the data does not persist if we redeploy the app

## Folder structure

- This app uses shadcn library which puts components to src/components/ui directory for us to customize it easily
- The database (sort of) data can be found in src/db/
- The api implementation can be found in src/app/api/

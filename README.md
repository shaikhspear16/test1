# rest-express

This repository contains a TypeScript-based REST application (server + client). The server is implemented with Express and TypeScript; the client uses Vite. This README explains how to install, build, and run the project locally.

## Prerequisites

- Node.js 18+ (install from https://nodejs.org/)
- npm (bundled with Node) or a compatible package manager (pnpm/yarn)
- PostgreSQL if you plan to use the database features (the project uses drizzle + pg)

## Install

1. Clone the repository:

   git clone https://github.com/shaikhspear16/test1.git
   cd test1

2. Install dependencies:

   npm install

(If you prefer pnpm or yarn, use `pnpm install` or `yarn install`.)

## Environment

Create a `.env` file in the repository root (or use another mechanism for environment variables). Common environment variables this project typically expects:

- DATABASE_URL - Postgres connection string (e.g. postgres://user:pass@localhost:5432/dbname)
- PORT - port for the server (default: 3000)
- NODE_ENV - `development` or `production`
- SESSION_SECRET - secret used for session encryption
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET - if Google auth is used

Example `.env` (DO NOT commit secrets):

DATABASE_URL=postgres://postgres:password@localhost:5432/mydb
PORT=3000
NODE_ENV=development
SESSION_SECRET=replace-with-a-secure-secret

## Scripts

Key scripts available in package.json:

- npm run dev:client  - start the frontend (Vite) on port 5000
- npm run dev         - start the server in development (runs `tsx server/index.ts`)
- npm run build       - build the project (runs `tsx script/build.ts`)
- npm run start       - run the production build (`node dist/index.cjs`)
- npm run check       - run TypeScript type-checking (`tsc`)
- npm run db:push     - push Drizzle schema changes to the database (`drizzle-kit push`)

## Development (local)

1. Make sure your `.env` is configured.
2. Start the database (if using PostgreSQL) and ensure `DATABASE_URL` points to it.
3. Start the server:

   npm run dev

   This runs the server from source using `tsx` so changes in TypeScript files reload without needing a full build.

4. (Optional) Start the client dev server in a separate terminal:

   npm run dev:client

   The client will run on port 5000 by default.

## Build and Run (production)

1. Build the project:

   npm run build

   This runs the build script (`tsx script/build.ts`) and should generate the production artifact in `dist/`.

2. Run the production server:

   npm run start

   The start script calls `node dist/index.cjs` with NODE_ENV=production. Ensure any required environment variables are set (DATABASE_URL, SESSION_SECRET, etc.).

## Type Checking

To run TypeScript type checking only:

npm run check

Fix reported issues by following the tsc output.

## Database

This project includes Drizzle (drizzle-orm/drizzle-kit) and `pg`. To apply schema changes to your connected database:

npm run db:push

Make sure `DATABASE_URL` points to your Postgres instance before running the command.

## Troubleshooting

- If dependencies fail to install: delete `node_modules` and reinstall with `npm ci` or `npm install`.
- If TypeScript errors block the build: run `npm run check` and fix the reported issues.
- If production build doesn't start, confirm `dist/index.cjs` exists after `npm run build` and check `NODE_ENV` and required environment variables.

## Contributing

Contributions are welcome. Open an issue or a pull request with your changes.

---


# Scholarkit

ScholarKit is an AI-powered web application designed to enhance the academic experience of university students by providing personalized, context-aware tools for studying, planning, and performance tracking. Built as a final-year project at the University of Nigeria, Nsukka, ScholarKit integrates AI tutoring, performance analytics, quiz generation, and academic utilities into a single platform tailored to students' department, course level, and institution-specific materials.

Made with [<3](https://studio.firebase.google.com) and [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)

## Stacks

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Bun** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Database Setup

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:

```bash
bun db:push
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
scholarkit/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Hono, ORPC)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Push schema changes to database
- `bun db:studio`: Open database studio UI

## Better T Stack Command to Replicate this Stack

```bash
bun create better-t-stack@latest scholarkit --yes --frontend next --api orpc --database postgres --db-setup supabase
```

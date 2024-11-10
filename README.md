# my-nodejs-ts-template

This is a basic template for a Node.js + TypeScript + Express + Yup validation + Prisma + MySQL project. It includes a simple authentication system, a user management system, and a database seeder. The project is designed to be easily customizable and extended.

## Getting Started

### Prerequisites

+ Node.js and npm installed.

+ Docker (optional if needed).

### Setup:

1. Clone the repository
```
git clone https://github.com/MohamadAtiye/my-nodejs-ts-template.git
cd my-nodejs-ts-template
```

2. Install dependencies:
```
npm install
```

3. Configure environment variables:
   
    + Create a .env file based on .env_bak and populate it with the required values. (use default if running docker Db)

5. Set up the database:

    + Option A (recommended): Run MySQL in Docker
      
      ```
      npm run dockerDb
      ```

    + Option B: Use an existing MySQL server by updating .env with your database details.

6. Initialize the database:

    + This command will:
      + Synchronize the database with the Prisma schema.
      + Generate migration SQL scripts.
      + Generate TypeScript types from the schema.
      + Seed initial data from prisma/seed.ts.
   
```
npm run reset
```

6. Run the server:
   

    + Option A locally in terminal
   ```
   npm run dev
   ```
    + Option B in docker container
   ```
   npm run dockerApp
   ```
    - The server will be available at http://localhost:3000.


### Default Login Credentials

+ Email: admin@mail.com
+ Password: password1
  
Authentication Route: POST http://localhost:3000/api/auth/login

## Database Management

### Seeding the Database
To seed the database manually or reset seed data from prisma/seed.ts, run:
```
npm run seed
```

### Updating the Database Structure

1. Update the database schema in `prisma/schema.prisma`.

2. Apply the schema changes and create a new migration:
```
npx prisma migrate dev --name <name>
```

### Resetting the Database
To completely reset the database schema, including migrations:

1. Delete all tables from your database manually.
2. Delete the prisma/migrations folder to remove previous migrations.
3. Re-run the full initialization:
```
npm run reset
```
this will re-create all DB tables, create a new migration file with all .sql queries to create the tables, and will run the seed script

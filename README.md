# my-nodejs-ts-template

This is a basic template for a Node.js + TypeScript + Express + Prisma + MySQL project. It includes a simple authentication system, a user management system, and a database seeder. The project is designed to be easily customizable and extended.

## Getting Started

### Installation using mysql db

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create and populate a `.env` file with same format as `.env_bak`
4. Run `npx prisma migrate dev --name init` to create the database tables. this will create a `prisma/migrations` folder with the migration files
5. Run `npm run seedAdmin` to seed the database with an admin user
6. Run `npm run dev` to start the server
7. use default admin user `admin@mail.com` and password `password1`
8. login route: `localhost:3000/api/auth/login`

### for using Docker mysql db

1. Clone the repository
2. run `docker-compose up -d` to start the mysql db
3. Run `npm install` to install the dependencies
4. copy contents of `.env_bak` to a new file `.env`
5. Run `npx prisma migrate dev --name init` to create the database tables. this will create a `prisma/migrations` folder with the migration files
6. Run `npm run seedAdmin` to seed the database with an admin user
7. Run `npm run dev` to start the server
8. use default admin user `admin@mail.com` and password `password1`
9. login route: `localhost:3000/api/auth/login`

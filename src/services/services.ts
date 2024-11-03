import { PrismaClient } from "@prisma/client";

export class DataSource {
  static client: PrismaClient;
  static initPrisma = () => {
    const database = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
    };

    try {
      this.client = new PrismaClient({
        datasources: {
          db: {
            url: `mysql://${database.user}:${database.password}@${database.host}:${database.port}/${database.database}`,
          },
        },
      });
      console.log("####### PRISMA INITIALIZED");
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          `failed to init prisma with ${JSON.stringify(database)}, ${
            err.message
          }`
        );
      } else {
        console.error(err);
        throw new Error(
          `failed to init prisma with ${JSON.stringify(database)}`
        );
      }
    }
  };
}

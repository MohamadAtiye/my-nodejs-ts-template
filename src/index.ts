import express, { Request, Response } from "express";
import routes from "./routes/routes";
import cors from "cors";
import helmet from "helmet";
import { DataSource } from "./services/services";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

// function to load secrets from a secret manager, like AWS Secrets Manager
async function loadSecrets() {
  try {
    // replace with real logic to load secrets
    const secrets = await Promise.resolve({
      HTTP_PORT: "3000",
      JWT_SECRET: "my_secret_key",
      DB_USER: "",
      DB_PASSWORD: "",
      DB_HOST: "",
      DB_PORT: "",
      DB_DATABASE: "",
    });

    // set the secrets as environment variables
    Object.keys(secrets).forEach((key) => {
      process.env[key] = secrets[key as keyof typeof secrets];
    });

    console.log("secrets loaded");
  } catch (error) {
    // handle failed to load secrets
  }
}

function initializeApp() {
  const startTime = new Date();

  console.log("current env is", process.env.NODE_ENV);

  // check if need to load secrets
  // local host will use the .env file
  if (process.env.NODE_ENV !== "localhost") {
    loadSecrets();
  }

  // initialize prisma DB based on env variables
  DataSource.initPrisma();

  // set up routes
  app.get("/", (req: Request, res: Response) => {
    res.send(`hello, started at ${startTime}`);
  });

  app.use("/api", routes);

  // start the server
  const PORT = +process.env.HTTP_PORT!;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

initializeApp();

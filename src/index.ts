import express, { Request, Response } from "express";
import routes from "./routes/routes";
import cors from "cors";
import helmet from "helmet";
import { configDotenv } from "dotenv";
import { DataSource } from "./services/services";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

function loadSecrets() {
  // TODO: add different logic to retrieve secrets from different sources in production

  try {
    const secrets = configDotenv();
    if (secrets.error) {
      console.error("Error loading .env file");
    }

    // use default values if not set
    process.env.JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";
    process.env.HTTP_PORT = process.env.HTTP_PORT || "3000";
    console.log("secrets loaded");
  } catch (error) {}
}

function initializeApp() {
  const startTime = new Date();
  app.get("/", (req: Request, res: Response) => {
    res.send(`hello, started at ${startTime}`);
  });

  loadSecrets();

  DataSource.initPrisma();

  app.use("/api", routes);

  const PORT = +process.env.HTTP_PORT!;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

initializeApp();

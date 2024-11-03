// routes/user.routes.ts
import express, { Request, Response } from "express";
import authRoute from "./auth.route";

const router = express.Router();

router.use("/auth", authRoute);

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, from API!");
});

export default router;

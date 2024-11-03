// routes/user.routes.ts
import express from "express";
import * as authController from "../controllers/auth.controller";
import * as authValidator from "../middleware/auth.validator";
import { validateIncoming } from "../middleware/validator";
import { authenticate } from "../middleware/authenticators";

const router = express.Router();

router.post(
  "/login",
  validateIncoming(authValidator.post_login),
  authController.post_loginUser
);

router.post(
  "/refresh",
  validateIncoming(authValidator.post_refresh),
  authController.post_refreshUser
);

router.put(
  "/changePassword",
  authenticate,
  validateIncoming(authValidator.put_changePassword),
  authController.post_changePassword
);

export default router;

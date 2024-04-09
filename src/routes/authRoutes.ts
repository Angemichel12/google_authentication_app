import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get("/auth/google", authController.authenticateGoogle);

router.get("/google/callback", authController.googleAuthCallback);

router.get("/auth/failure", authController.authFailure);

router.get("/protected", authController.protectedRoute);

export default router;

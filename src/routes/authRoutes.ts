import express from "express";
import * as authController from "../controllers/authController";
import userRoute from "../controllers/userController";
import upload from "../helper/multer";

const router = express.Router();

router.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get("/auth/google", authController.authenticateGoogle);

router.get("/google/callback", authController.googleAuthCallback);

router.get("/auth/failure", authController.authFailure);

router.get("/protected", authController.protectedRoute);

// routes of users from database

// endpoint for getting all users from database
router.get("/api/users", userRoute.getAllUsersFromDataBase);

// endpoint for getting a single user from database
router.get("/api/users/:id", userRoute.getSingleUserFromDataBase);

// endpoint for updating a user from database
router.patch("/api/users/:id",upload.single("profile"), userRoute.updateUserFromDataBase);

export default router;

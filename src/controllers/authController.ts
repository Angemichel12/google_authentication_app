import { Request, Response } from "express";
import passport from "passport";

export const authenticateGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});

export const googleAuthCallback = passport.authenticate("google", {
  successRedirect: "/protected",
  failureRedirect: "/auth/failure",
});

export const authFailure = (req: Request, res: Response) => {
  res.send("Something went wrong...");
};

export const protectedRoute = (req: Request, res: Response) => {
  res.send("Hello!");
};

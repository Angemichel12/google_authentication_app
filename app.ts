import express from "express";
import session from "express-session";
import passport from "passport";
import { Request, Response } from "express";
import router from "./src/routes/authRoutes";

const app = express();
require("./src/authentication/auth");

app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

export default app;

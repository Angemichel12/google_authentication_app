import express from "express";
import { Request, Response } from "express";
import router from "./src/routes/authRoutes";
import passport from "passport";
const app = express();
require("./src/authentication/auth");
app.use(express.json());
app.use("/", router);

export default app;

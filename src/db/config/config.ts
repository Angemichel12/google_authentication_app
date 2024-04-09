import { Sequelize } from "sequelize";
import dotenv from "dotenv/config";

const db = new Sequelize(process.env.DBCONNECTION as string, {
  dialect: "postgres",
});

export default db;

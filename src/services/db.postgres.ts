import {Sequelize} from "sequelize"
import db from "../db/config/config";
const connectionToDatabase = async () => {
    try{
        await db.authenticate();
        await db.sync();
        console.log("Connection has been established successfully");
    } catch (error){
        console.error("Enable to connect to the database", error)
    }
};

export default connectionToDatabase;
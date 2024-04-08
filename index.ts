import { Sequelize } from "sequelize";
import app from "./app";

const dbConnection:string = process.env.DBCONNECTION ?? '';

if(!dbConnection){
    console.log("The database connection string is missing!!");
}

const db = new Sequelize(dbConnection, {
    dialect: 'postgres'
})

const connectionToDatabase = async () => {
    try{
        await db.authenticate();
        console.log("Connection has been established successfully");
    } catch (error){
        console.error("Enable to connect to the database", error)
    }
};

connectionToDatabase()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running n PORT: http://localhost:${PORT}`)
});
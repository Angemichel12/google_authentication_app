import { Sequelize } from "sequelize";
import app from "./app";

import connectionToDatabase from "./src/services/db.postgres";

connectionToDatabase();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running PORT: http://localhost:${PORT}`)
});
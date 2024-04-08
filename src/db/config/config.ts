import {Sequelize} from 'sequelize'

const db = new Sequelize(process.env.DBCONNECTION as string, {
  dialect: 'postgres'
});

export default db;
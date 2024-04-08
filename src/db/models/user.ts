import { profile } from "console";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import db from "../config/config";

interface userAttributes {
  id:string,
  firstName: string,
  lastName: string,
  email: string,
  profile: string,
  isVerified: boolean
}

export class UserModel extends Model <userAttributes> {}
UserModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
},{sequelize:db,tableName:"Users"})
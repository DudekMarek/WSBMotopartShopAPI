import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import sequelize from "../services/dbService";

type T_ALLOWED_USER_TYPES = "sealsperson" | "warehouseman" | "serviceTechnican" | "customer"

const ALLOWED_USER_TYPES: T_ALLOWED_USER_TYPES[] = [
  "sealsperson",
  "warehouseman",
  "serviceTechnican",
  "customer"
];

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare username: string;
  declare password: string;
  declare userType: T_ALLOWED_USER_TYPES
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userType: {
    type: DataTypes.ENUM<T_ALLOWED_USER_TYPES>(...ALLOWED_USER_TYPES),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: "users",
  sequelize
})

export { T_ALLOWED_USER_TYPES, ALLOWED_USER_TYPES };
export default User;

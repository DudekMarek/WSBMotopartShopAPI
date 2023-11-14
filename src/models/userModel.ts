import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import sequelize from "../services/dbService";

type ALLOWED_USER_TYPES = "sealsperson" | "warehouseman" | "serviceTechnican" | "customer"

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userName: string;
  declare password: string;
  declare userType: ALLOWED_USER_TYPES
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init({
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  tableName: "users",
  sequelize
})

export default User;

// const allowedUserTypes = [
//   "sealsperson",
//   "warehouseman",
//   "serviceTechnican",
//   "customer",
// ];
//
// const User = sequelize.define("User", {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   userType: {
//     type: DataTypes.STRING,
//     validate: {
//       isIn: {
//         args: [allowedUserTypes],
//         msg: `uerType must be one of: ${allowedUserTypes}`,
//       },
//     },
//   },
// });
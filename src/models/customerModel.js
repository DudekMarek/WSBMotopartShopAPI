import { DataTypes } from "sequelize";
import sequelize from "../services/dbService.js";

const Customer = sequelize.define("Customers", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Customer;

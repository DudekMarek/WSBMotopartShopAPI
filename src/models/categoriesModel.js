import { DataTypes } from "sequelize";
import sequelize from "../services/dbService.js";

const Categories = sequelize.define("Categories", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Categories;

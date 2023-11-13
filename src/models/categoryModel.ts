import { DataTypes } from "sequelize";
import sequelize from "../services/dbService.js";

const Category = sequelize.define("Category", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Category;

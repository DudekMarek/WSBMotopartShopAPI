import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../services/dbService";
import Category from "./categoryModel";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare productName: string;
    declare productModel: string;
    declare productDescription: string;
    declare categoryId: number;
    declare price: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Product.init({
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productModel: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  productDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull:  false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: "products",
  sequelize
});

export default Product;

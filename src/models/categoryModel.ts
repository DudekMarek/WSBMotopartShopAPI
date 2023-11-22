import {DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize'
import sequelize from '../services/dbService'


class Category extends Model <InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare categoryName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}


Category.init({
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: "categories",
  sequelize
})

export default Category;

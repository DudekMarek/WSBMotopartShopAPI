import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../services/dbService";
import ServiceOrder from "./serviceOrderModel";
import Product from "./productModel";

class ServiceParts extends Model<
  InferAttributes<ServiceParts>,
  InferCreationAttributes<ServiceParts>
> {
  declare serviceOrderId: number;
  declare productId: number;
  declare quantity: number;
  declare subtotal: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ServiceParts.init(
  {
    serviceOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ServiceOrder,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "serviceParts",
    sequelize: sequelize,
  }
);

export default ServiceParts;

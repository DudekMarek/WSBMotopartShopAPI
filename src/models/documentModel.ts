import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../services/dbService";
import Order from "./orderModel";
import ServiceOrder from "./serviceOrderModel";
import User from "./userModel";

type T_ALLOWED_DOCUMENT_TYPES = "invoice" | "receipt" | "WZ";

const ALLOWED_DOCUMENT_TYPES: T_ALLOWED_DOCUMENT_TYPES[] = [
  "invoice",
  "receipt",
  "WZ",
];

class Document extends Model<
  InferAttributes<Document>,
  InferCreationAttributes<Document>
> {
  declare documentType: T_ALLOWED_DOCUMENT_TYPES;
  declare documentDate: Date;
  declare orderId: number;
  declare serviceOrderId: number;
  declare userId: number;
}

Document.init(
  {
    documentType: {
      type: DataTypes.ENUM<T_ALLOWED_DOCUMENT_TYPES>(...ALLOWED_DOCUMENT_TYPES),
      allowNull: false,
    },
    documentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Order,
        key: "id",
      },
    },
    serviceOrderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ServiceOrder,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "documents",
    sequelize,
  }
);

export default Document;
export { T_ALLOWED_DOCUMENT_TYPES, ALLOWED_DOCUMENT_TYPES };

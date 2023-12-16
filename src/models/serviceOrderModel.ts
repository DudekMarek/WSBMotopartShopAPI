import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../services/dbService";

import Order from "./orderModel";
import { SrvRecord } from "dns";

type T_ALLOWED_SERVICE_ORDER_STATUSES =
  | "created"
  | "paid"
  | "queued"
  | "in_progress"
  | "done";

const ALLOWED_SERVICE_ORDER_STATUSES: T_ALLOWED_SERVICE_ORDER_STATUSES[] = [
  "created",
  "paid",
  "queued",
  "in_progress",
  "done",
];

class ServiceOrder extends Model<
  InferAttributes<ServiceOrder>,
  InferCreationAttributes<ServiceOrder>
> {
  declare serviceDate: Date;
  declare serviceStatus: T_ALLOWED_SERVICE_ORDER_STATUSES;
  declare serviceCost: number;
  declare servicePartsCost: number;
  declare serviceTotalCost: number;
  declare serviceDescription: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ServiceOrder.init(
  {
    serviceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    serviceStatus: {
      type: DataTypes.ENUM<T_ALLOWED_SERVICE_ORDER_STATUSES>(
        ...ALLOWED_SERVICE_ORDER_STATUSES
      ),
      allowNull: false,
      defaultValue: "created",
    },
    serviceCost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    servicePartsCost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    serviceTotalCost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    serviceDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "serviceOrders",
    sequelize,
  }
);

export default ServiceOrder;
export { T_ALLOWED_SERVICE_ORDER_STATUSES, ALLOWED_SERVICE_ORDER_STATUSES };

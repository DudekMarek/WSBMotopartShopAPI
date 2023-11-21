import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

import sequelize from "../services/dbService";
import Customer from "./customerModel";

type T_ALLOWED_ORDER_STATUSES = "new" | "processing" | "paid" | "shipped" | "delivered" | "completed" | "cancelled";

const ALLOWED_ORDER_STATUSES: T_ALLOWED_ORDER_STATUSES[] = [
    "new",
    "processing",
    "paid",
    "shipped",
    "delivered",
    "completed",
    "cancelled"
];

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare orderDate: Date;
    declare status: T_ALLOWED_ORDER_STATUSES;
    declare customerId: number;
    declare totalCost: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Order.init({
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    status: {
        defaultValue: "new",
        type: DataTypes.ENUM(...ALLOWED_ORDER_STATUSES),
        allowNull: false,
    },
    customerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'id',
        },
        allowNull: false,
    },
    totalCost: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    tableName: "orders",
    sequelize
});

export default Order;
export { T_ALLOWED_ORDER_STATUSES, ALLOWED_ORDER_STATUSES }

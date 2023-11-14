import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

import sequelize from "../services/dbService.js";
import Customer from "./customerModel.js";


type T_ALLOWED_ORDER_STATUSES = "new" | "processing" | "paid" | "shipped" | "delivered" | "completed" | "cancelled";

const ALLOWED_ORDER_STATUSES = [
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
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "new",
        allowNull: false,
        validate: {
            isIn: {
                args: [ALLOWED_ORDER_STATUSES],
                msg: `Status must be one of: ${ALLOWED_ORDER_STATUSES}`,
            },
        },
    },
    customerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'id',
        }
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

// const allowedOrderStatuses = [
//     "new",
//     "processing",
//     "paid",
//     "shipped",
//     "delivered",
//     "completed",
//     "cancelled"
// ];

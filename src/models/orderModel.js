import { DataTypes } from "sequelize";
import sequelize from "../services/dbService.js";
import Customer from "./customerModel.js";

const allowedOrderStatuses = [
    "new",
    "processing",
    "paid",
    "shipped",
    "delivered",
    "completed",
    "cancelled"
  ];

const Order = sequelize.define("Orders", {
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
              args: [allowedOrderStatuses],
              msg: `Status must be one of: ${allowedOrderStatuses}`,
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
    }
    
});

export default Order;

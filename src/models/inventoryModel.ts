// CREATE TABLE "Inventory" (
//     "InventoryID" integer PRIMARY KEY,
//     "ProductID" integer,
//     "QuantityInStock" integer
//   );

import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import Product from "./productModel";
import sequelize from "../services/dbService"

class Inventory extends Model<InferAttributes<Inventory>, InferCreationAttributes<Inventory>> {
    declare productId: number;
    declare quantity: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Inventory.init({
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    tableName: "inventories",
    sequelize
});

export default Inventory;
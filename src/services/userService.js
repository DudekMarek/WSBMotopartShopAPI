import { Sequelize, DataTypes } from "sequelize";

import sequelize from "./dbService";

const allowedUserTypes = ['sealsperson', 'warehouseman', 'serviceTechnican', 'customer']

const User = sequelize.define('User', {
    userID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [allowedUserTypes],
                msg: `uerType must be one of: ${allowedUserTypes}`
            }
        }
    }
})

export default User
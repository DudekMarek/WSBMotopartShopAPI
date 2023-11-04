import { Sequelize } from "sequelize";

const databaseName = process.env.DB_NAME || "test"
const username = process.env.DB_USERNAME || "root"
const password = process.env.DB_PASSWORD || "root"
const databasePort = process.env.DB_PORT || 5432

const sequelize = new Sequelize(databaseName, username, password, {
    dialect: 'postgres',
    host: 'localhost',
    port: databasePort
})

export default sequelize
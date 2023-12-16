import { Sequelize } from "sequelize";

const databaseName = process.env.DB_NAME || "test";
const username = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "root";
const databasePort = parseInt(process.env.DB_PORT as string) || 5432;
const databbaseHost = process.env.DB_HOST || "postgres";

const sequelize = new Sequelize(databaseName, username, password, {
  dialect: "postgres",
  host: databbaseHost,
  port: databasePort,
});

export default sequelize;

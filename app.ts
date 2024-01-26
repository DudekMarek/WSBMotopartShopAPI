import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import "dotenv/config";
import router from "./src/routes";
import sequelize from "./src/services/dbService";
import * as models from "./src/models";

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API works!$!",
  });
});

app.use(router);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Sync succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";

import sequelize from "./src/services/dbService.js";

import * as models from "./src/models/index.js";
import router from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "API works",
  });
});

app.use(router);

await sequelize
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

import express from "express";
import bodyParser from "body-parser";

import sequelize from "./src/services/dbService.js";
import userRouter from "./src/routes/userRoute.js";
import customerRouter from "./src/routes/customerRoute.js";
import categoriesRouter from "./src/routes/categoriesRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "API works",
  });
});

app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/categories", categoriesRouter);

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

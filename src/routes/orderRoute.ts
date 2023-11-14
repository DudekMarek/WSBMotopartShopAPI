import express from "express";
import * as orderController from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", orderController.get)

export default orderRouter;
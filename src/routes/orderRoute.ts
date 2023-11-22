import express from "express";
import * as orderController from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.get("/", orderController.get)

orderRouter.post("/", orderController.create)

orderRouter.delete("/:id", orderController.remove)

orderRouter.patch("/:id", orderController.update)

export default orderRouter;
import express from "express";
import * as orderItemsControler from "../controllers/orderItemsController";

const orderItemsRouter = express.Router();

orderItemsRouter.get("/", orderItemsControler.get);

orderItemsRouter.post("/", orderItemsControler.create);

orderItemsRouter.delete("/:id", orderItemsControler.remove);

orderItemsRouter.patch("/:id", orderItemsControler.update);

export default orderItemsRouter;

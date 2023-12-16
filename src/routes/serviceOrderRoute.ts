import express from "express";
import * as serviceOrderController from "../controllers/serviceOrdersController";

const serviceOrderRouter = express.Router();

serviceOrderRouter.get("/", serviceOrderController.get);

serviceOrderRouter.post("/", serviceOrderController.create);

serviceOrderRouter.delete("/:id", serviceOrderController.remove);

serviceOrderRouter.patch("/:id", serviceOrderController.update);

export default serviceOrderRouter;

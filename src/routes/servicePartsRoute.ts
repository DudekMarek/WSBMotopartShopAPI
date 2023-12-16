import express from "express";
import * as servicePartsController from "../controllers/servicePartsController";

const servicePartsRouter = express.Router();

servicePartsRouter.get("/", servicePartsController.get);

servicePartsRouter.post("/", servicePartsController.create);

servicePartsRouter.delete("/:id", servicePartsController.remove);

servicePartsRouter.patch("/:id", servicePartsController.update);

export default servicePartsRouter;

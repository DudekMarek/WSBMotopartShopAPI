import express from "express";
import * as categoryController from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.get);

categoryRouter.post("/", categoryController.create);

categoryRouter.delete("/:id", categoryController.remove);

categoryRouter.patch("/:id", categoryController.update);

export default categoryRouter;

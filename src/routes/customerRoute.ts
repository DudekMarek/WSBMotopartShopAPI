import express from "express";
import * as customerController from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/", customerController.get);

customerRouter.post("/", customerController.create);

customerRouter.delete("/:id", customerController.remove);

customerRouter.patch("/:id", customerController.update);

export default customerRouter;

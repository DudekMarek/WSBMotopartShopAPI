import express from "express";
import * as documentController from "../controllers/documentControler";

const documentRouter = express.Router();

documentRouter.get("/", documentController.get);

documentRouter.post("/", documentController.create);

documentRouter.delete("/:id", documentController.remove);

documentRouter.patch("/:id", documentController.update);

export default documentRouter;

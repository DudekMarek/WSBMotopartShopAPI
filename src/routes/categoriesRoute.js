import express from "express";
import * as categoriesControler from "../controllers/categoriesControler.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesControler.get);

categoriesRouter.post("/", categoriesControler.create);

categoriesRouter.delete("/:id", categoriesControler.remove);

categoriesRouter.patch("/:id", categoriesControler.update);

export default categoriesRouter;

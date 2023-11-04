import express from "express";
import * as customerControler from "../controllers/customerControler.js";

const customerRouter = express.Router();

customerRouter.get("/", customerControler.get);

customerRouter.post("/", customerControler.create);

customerRouter.delete("/:id", customerControler.remove);

customerRouter.param("/:id", customerControler.update);

export default customerRouter;

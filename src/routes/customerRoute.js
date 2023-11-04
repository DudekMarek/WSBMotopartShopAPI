import express from "express";
import * as customerControler from "../controllers/customerControler.js";

const customerRouter = express.Router();

customerRouter.get("/", customerControler.get);

customerRouter.post("/", customerControler.create);

export default customerRouter;

import express from "express";

import * as userControler from "../controllers/userControler.js";

const userRouter = express.Router();

userRouter.get("/", userControler.get);

userRouter.post("/", userControler.create);

userRouter.delete("/:id", userControler.remove);

userRouter.patch("/:id", userControler.update);

export default userRouter;

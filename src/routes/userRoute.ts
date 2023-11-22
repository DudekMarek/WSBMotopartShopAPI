import express from "express";

import * as userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userController.get);

userRouter.post("/", userController.create);

userRouter.delete("/:id", userController.remove);

userRouter.patch("/:id", userController.update);

export default userRouter;

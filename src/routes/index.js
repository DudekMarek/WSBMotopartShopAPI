import express from "express"
import categoryRouter from "./categoryRoute.js";
import userRouter from "./userRoute.js";
import customerRouter from "./customerRoute.js";
import orderRouter from "./orderRoute.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);

export default router;
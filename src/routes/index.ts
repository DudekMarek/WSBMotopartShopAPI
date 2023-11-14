import express from "express"
import categoryRouter from "./categoryRoute";
import userRouter from "./userRoute";
import customerRouter from "./customerRoute";
import orderRouter from "./orderRoute";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);

export default router;
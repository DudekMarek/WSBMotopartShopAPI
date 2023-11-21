import express from "express"
import userRouter from "./userRoute";
import customerRouter from "./customerRoute";
import categoryRouter from "./categoryRoute";
import productRouter from "./productRoute";
import orderRouter from "./orderRoute";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);


export default router;
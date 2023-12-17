import express from "express";
import userRouter from "./userRoute";
import customerRouter from "./customerRoute";
import categoryRouter from "./categoryRoute";
import productRouter from "./productRoute";
import orderRouter from "./orderRoute";
import inventoryRouter from "./inventoryRoute";
import orderItemsRouter from "./orderItemsRoute";
import serviceOrderRouter from "./serviceOrderRoute";
import servicePartsRouter from "./servicePartsRoute";
import documentRouter from "./documentRoute";

const router = express.Router();

router.use("/users", userRouter);
router.use("/customers", customerRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/inventories", inventoryRouter);
router.use("/order-items", orderItemsRouter);
router.use("/service-orders", serviceOrderRouter);
router.use("/service-parts", servicePartsRouter);
router.use("/documents", documentRouter);

export default router;

import { Request, Response } from "express";
import Product from "../models/productModel";
import Category from "../models/categoryModel";
import {
  CreateOrderItems,
  UpdateOrderItems,
} from "../schemas/orderItemsSchema";
import { ensureExists, getEntityById } from "../services/relationService";
import { validateInstance, handleError } from "../helpers/validation";
import OrderItems from "../models/orderItemsModel";
import { plainToInstance } from "class-transformer";
import Order from "../models/orderModel";
import Inventory from "src/models/inventoryModel";

async function get(req: Request, res: Response) {
  try {
    const orderItems = await OrderItems.findAll();
    res.json(orderItems);
  } catch (err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
    const orderItems = plainToInstance(CreateOrderItems, req.body);
    await validateInstance(orderItems);
    // Ensure that product and order exist
    await ensureExists(Product, orderItems.productId);
    await ensureExists(Order, orderItems.orderId);
    const createdOrderItems = await OrderItems.create({ ...orderItems });
    res.status(201).send(createdOrderItems);
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const orderItemsId = parseInt(req.params.id);
    const existingorderItemsId = await getEntityById(OrderItems, orderItemsId);
    const orderItems = plainToInstance(UpdateOrderItems, req.body);
    await validateInstance(orderItems);
    await ensureExists(Product, orderItems.productId);
    await ensureExists(Order, orderItems.orderId);
    const updatedOrderItems = await existingorderItemsId.update(orderItems);
    res.status(200).send(updatedOrderItems);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const orderItemsId = parseInt(req.params.id, 10);
    const existingorderItemsId = await getEntityById(OrderItems, orderItemsId);
    existingorderItemsId.destroy();
    res
      .status(200)
      .json({ message: `OrferItems with id ${orderItemsId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}

export { get, create, update, remove };

import { Request, Response } from "express";
import Customer from "../models/customerModel";
import Order from "../models/orderModel";
import { CreateOrder, UpdateOrder } from "../schemas/orderSchema";
import { plainToInstance } from "class-transformer";
import { ensureExists, getEntityById } from '../services/relationService'
import { validateInstance, handleError } from "../helpers/validation";

async function get(req: Request, res: Response) {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
    const order = plainToInstance(CreateOrder, req.body);
    validateInstance(order);
    // Ensure customer exists
    await ensureExists(Customer, order.customerId);
    const createdOrder = await Order.create({ ...order });
    res.status(201).send(createdOrder);
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const orderId = parseInt(req.params.id, 10);
    const existingOrder = await getEntityById(Order, orderId);
    const order = plainToInstance(UpdateOrder, req.body);
    validateInstance(order);
    await ensureExists(Customer, order.customerId);
    const updatedOrder = await existingOrder.update(order);
    res.status(200).send(updatedOrder);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const orderId = parseInt(req.params.id, 10);
   const existingOrder = await getEntityById(Order, orderId);
    await existingOrder.destroy();
    res.status(200).json({ message: `Order with ${orderId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}

export { get, create, remove, update };
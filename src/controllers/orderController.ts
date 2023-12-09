import { Request, Response } from "express";
import Order from "../models/orderModel";
import { CreateOrder, UpdateOrder } from "../schemas/orderSchema";
import { plainToInstance } from "class-transformer";
import { EntityNotFoundError, handleError } from "../helpers/validation";

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
    const createdOrder = await Order.create({ ...order });
    res.status(201).send(createdOrder);
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    const existingOrder = await Order.findByPk(orderId);
    if (!existingOrder) {
      throw new EntityNotFoundError("Order not found");
    }
    const order = plainToInstance(UpdateOrder, req.body);
    const updatedOrder = await existingOrder.update(order);
    res.status(200).send(updatedOrder);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    const existingOrder = await Order.findByPk(orderId);
    if (!existingOrder) {
      throw new EntityNotFoundError("Order not found");
    }
    await existingOrder.destroy();
    res.status(200).json({ message: `Order with ${orderId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}

export { get, create, remove, update };
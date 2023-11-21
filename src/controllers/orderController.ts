import { Request, Response } from "express";
import Order from "../models/orderModel";
import { plainToInstance } from "class-transformer";
import { CreateOrder, UpdateOrder } from "../schemas/orderSchema";
import { validateOrReject } from "class-validator";
import { isValidationError } from "../helpers/validation";
import { UniqueConstraintError } from "sequelize";

async function get(req: Request, res: Response) {
   try {
    const orders = await Order.findAll();
    res.json(orders);
   } catch(err) {
      console.error(`Error fetching orders: ${err}`);
      res.status(500).json({ error: err });
   }
}

async function create(req: Request, res: Response){
  try {
    const order = plainToInstance(CreateOrder, req.body);
    await validateOrReject(order);
    const createdOrder = await Order.create({
      ...order
    });
    res.status(201).send(createdOrder);
   } catch(err) {
      if (isValidationError(err)) {
      res.status(400).send({ error: 'Validation error', details: err });
      } else if (err instanceof UniqueConstraintError) {
      res.status(409).send({ error: 'Order with this id already exists' });
      } else {
      console.error(`Error while creating order: ${err}`);
      res.status(500).json({ error: err });
      }  
   }
}

async function remove(req: Request, res: Response) {
   try {
   const orderId = req.params.id;
   const order = await Order.findByPk(orderId);
   if (!order) {
   res.status(404).json({error: "Order not found"});
   } else {
   await order.destroy();
   res.status(200).json({message: `Order with Id: ${orderId} deleted`});
   }} catch(err) {
   console.error(`Error while deleting order: ${err}`);
   res.status(500).json({error: err});
   }
}

async function update(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    const existingOrder = await Order.findByPk(orderId);
    const order = plainToInstance(UpdateOrder, req.body);
    await validateOrReject(order);
    if (!existingOrder) {
      res.status(404).json({error: "Order not found"});
    } else {
      await existingOrder.update(order);
      res.status(200).json(order);
    }} catch(err) {
    if (isValidationError(err)) {
      res.status(400).send({ error: 'Validation error', details: err });
    } else if (err instanceof UniqueConstraintError) {
      res.status(409).send({ error: 'Order with this id already exists' });
    } else {
      console.error(`Error while updating order: ${err}`);
      res.status(500).json({error: err});
    }
  }
}

export { get, create, remove, update}
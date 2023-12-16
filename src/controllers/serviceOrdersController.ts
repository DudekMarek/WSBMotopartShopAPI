import { Request, Response } from "express";
import ServiceOrder from "../models/serviceOrderModel";
import {
  CreateServiceOrder,
  UpdateServiceOrder,
} from "../schemas/serviceOrderSchema";
import { plainToInstance } from "class-transformer";
import { ensureExists, getEntityById } from "../services/relationService";
import { validateInstance, handleError } from "../helpers/validation";
import Order from "src/models/orderModel";
import { order } from "src/models";

async function get(req: Request, res: Response) {
  try {
    const serviceOrder = await ServiceOrder.findAll();
    res.json(serviceOrder);
  } catch (err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
    const serviceOrder = plainToInstance(CreateServiceOrder, req.body);
    await validateInstance(serviceOrder);
    const createdServiceOrder = await ServiceOrder.create({ ...serviceOrder });
    res.status(201).send(createdServiceOrder);
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const serviceOrderId = parseInt(req.params.id, 10);
    const existigServiceOrder = await getEntityById(
      ServiceOrder,
      serviceOrderId
    );
    const serviceOrder = plainToInstance(UpdateServiceOrder, req.body);
    await validateInstance(serviceOrder);
    const updatedServiceOrder = await existigServiceOrder.update(serviceOrder);
    res.status(200).send(updatedServiceOrder);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const serviceOrderId = parseInt(req.params.id, 10);
    const existigServiceOrder = await getEntityById(
      ServiceOrder,
      serviceOrderId
    );
    await existigServiceOrder.destroy();
    res
      .status(200)
      .json({ message: `ServiceOrder with id ${serviceOrderId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}

export { get, create, update, remove };

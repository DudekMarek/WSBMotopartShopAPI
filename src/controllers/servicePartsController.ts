import { Request, Response } from "express";
import ServiceOrder from "../models/serviceOrderModel";
import Product from "../models/productModel";
import ServiceParts from "../models/servicePartsModel";
import {
  CreateServiceParts,
  UpdateServiceParts,
} from "../schemas/servicePartsSchema";
import { plainToInstance } from "class-transformer";
import { ensureExists, getEntityById } from "../services/relationService";
import { validateInstance, handleError } from "../helpers/validation";
import moment from "moment/moment";

async function get(req: Request, res: Response) {
  try {
    const serviceParts = await ServiceParts.findAll();
    res.json(serviceParts);
  } catch (err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
    if(typeof req.body.updatedAt === "string"){
      req.body.updatedAt = moment(req.body.updatedAt, "YYYY-MM-DD").toDate()
    }
    if(typeof req.body.createdAt === "string"){
      req.body.createdAt = moment(req.body.createdAt, "YYYY-MM-DD").toDate()
    }
    const serviceParts = plainToInstance(CreateServiceParts, req.body);
    await validateInstance(serviceParts);

    await ensureExists(ServiceOrder, serviceParts.serviceOrderId);
    await ensureExists(Product, serviceParts.productId);

    const createdServiceParts = await ServiceParts.create({ ...serviceParts });
    res.status(201).send(createdServiceParts);
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    if(typeof req.body.updatedAt === "string"){
      req.body.updatedAt = moment(req.body.updatedAt, "YYYY-MM-DD").toDate()
    }
    if(typeof req.body.createdAt === "string"){
      req.body.createdAt = moment(req.body.createdAt, "YYYY-MM-DD").toDate()
    }
    const servicePartsId = parseInt(req.params.id, 10);
    const existingServiceParts = await getEntityById(
      ServiceOrder,
      servicePartsId
    );
    const serviceParts = plainToInstance(UpdateServiceParts, req.body);
    await validateInstance(serviceParts);
    await ensureExists(ServiceOrder, serviceParts.serviceOrderId);
    await ensureExists(Product, serviceParts.productId);
    const updatedServiceParts = await existingServiceParts.update(serviceParts);
    res.status(200).send(updatedServiceParts);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const servicePartsId = parseInt(req.params.id, 10);
    const existingServiceParts = await getEntityById(
      ServiceParts,
      servicePartsId
    );
    await existingServiceParts.destroy();
    res
      .status(200)
      .json({ message: `ServiceParts with id ${servicePartsId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}

export { get, create, update, remove };

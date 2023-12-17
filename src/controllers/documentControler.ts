import { Request, Response } from "express";
import Document from "../models/documentModel";
import Order from "../models/orderModel";
import ServiceOrder from "../models/serviceOrderModel";
import User from "../models/userModel";
import { plainToInstance } from "class-transformer";
import { ensureExists, getEntityById } from "../services/relationService";
import { validateInstance, handleError } from "../helpers/validation";
import { CreateDocument, UpdateDocument } from "../schemas/documentSchema";
import { ValidationError } from "sequelize";

async function get(req: Request, res: Response) {
  try {
    const documents = await Document.findAll();
    res.json(documents);
  } catch (err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
    const document = plainToInstance(CreateDocument, req.body);
    await validateInstance(document);

    if (document.serviceOrderId == null && document.orderId == null) {
      throw new Error(
        "No OrderId or ServiceOrderId you must specify one of them"
      );
    } else if (document.serviceOrderId != null && document.orderId != null) {
      throw new Error(
        "OrderId and ServiceOrderId are specified You must specify only one of them"
      );
    } else {
      if (document.serviceOrderId != null) {
        await ensureExists(ServiceOrder, document.serviceOrderId);
      } else {
        await ensureExists(Order, document.orderId);
      }
      await ensureExists(User, document.userId);
    }
    const createdDocument = await Document.create({ ...document });
    res.status(200).send(createdDocument);
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const documentId = parseInt(req.params.id, 10);
    const existingDocument = await getEntityById(Document, documentId);
    const document = plainToInstance(UpdateDocument, req.body);
    await validateInstance(document);

    if (document.serviceOrderId == null && document.orderId == null) {
      throw new Error(
        "No OrderId or ServiceOrderId you must specify one of them"
      );
    } else if (document.serviceOrderId != null && document.orderId != null) {
      throw new Error(
        "OrderId and ServiceOrderId are specified You must specify only one of them"
      );
    } else {
      if (document.serviceOrderId != null) {
        await ensureExists(ServiceOrder, document.serviceOrderId);
      } else {
        await ensureExists(Order, document.orderId);
      }
      await ensureExists(User, document.userId);
    }
    const updatedDocumented = await existingDocument.update(document);
    res.status(200).send(updatedDocumented);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const documentId = parseInt(req.params.id, 10);
    const existingDocument = await getEntityById(Document, documentId);
    await existingDocument.destroy();
    res.status(200).json({ message: `Document with id ${documentId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}

export { get, create, update, remove };

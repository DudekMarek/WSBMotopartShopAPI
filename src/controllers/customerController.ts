import { Request, Response } from "express";
import Customer from "../models/customerModel";
import { CreateCustomer, UpdateCustomer } from "../schemas/customerSchema";
import { plainToInstance } from "class-transformer";
import { getEntityById } from "../services/relationService";
import { validateInstance, handleError } from "../helpers/validation";

async function get(req: Request, res: Response) {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch(err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
  const customer = plainToInstance(CreateCustomer, req.body);
  await validateInstance(customer);
  const createdCustomer = await Customer.create({ ...customer });
  res.status(201).send(createdCustomer);
  } catch(err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const customerId = parseInt(req.params.id);
    const existingCustomer = await getEntityById(Customer, customerId);
    await existingCustomer.destroy();
    res.status(200).json({message: `Customer with id ${customerId} deleted`});
  } catch(err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const customerId = parseInt(req.params.id, 10);
    const existingCustomer = await getEntityById(Customer, customerId);
    const customer = plainToInstance(UpdateCustomer, req.body);
    await validateInstance(customer);
    const updatedCustomer = await existingCustomer.update(customer);
    res.status(200).send(updatedCustomer);
  } catch(err) {
    handleError(err, res);
  }
}

export { get, create, remove, update };

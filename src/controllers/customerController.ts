import { Request, Response } from "express";
import Customer from "../models/customerModel";
import { validateOrReject } from "class-validator";
import { isValidationError } from "../helpers/validation";
import { plainToInstance } from "class-transformer";
import { CreateCustomer, UpdateCustomer } from "../schemas/customerSchema";
import { UniqueConstraintError } from "sequelize";

async function get(req: Request, res: Response) {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch(err) {
    console.error(`Error fetching customers: ${err}`);
    res.status(500).json({ error: err });
  }
}

async function create(req: Request, res: Response) {
  try {
  const customer = plainToInstance(CreateCustomer, req.body);
  await validateOrReject(customer);
  const createdCustomer = await Customer.create({
    ...customer,
  });
  res.status(201).send(createdCustomer);
  } catch(err) {
    if (isValidationError(err)) {
    res.status(400).send({ error: 'Validation error', details: err });
    } else if (err instanceof UniqueConstraintError) {
    res.status(409).send({ error: 'Customer with this name already exists' });
    } else {
    console.error('Error while creating customer:', err);
    res.status(500).send({ error: 'Internal server error' });
    }
  }
}

async function remove(req: Request, res: Response) {
  try {
  const customerId = req.params.id;
  const customer = await Customer.findByPk(customerId);
  if (!customer) {
    res.status(404).json({error: "Customer not found"});
  } else {
    await customer.destroy();
    res.status(200).json({message: `Customer with Id: ${customerId} deleted`});
  }} catch(err) {
    console.error(`Error while deleting customer: ${err}`);
    res.status(500).json({error: err});
  }
}

async function update(req: Request, res: Response) {
  try {
  const customerId = req.params.id;
  const existingCustomer = await Customer.findByPk(customerId);
  const customer = plainToInstance(UpdateCustomer, req.body);
  await validateOrReject(customer);
  if (!existingCustomer) {
    res.status(404).json({error: "Customer not found"});
  } else {
    await existingCustomer.update({
      ...customer
    });
    res.status(200).json({message: `Customer with Id: ${customerId} updated`});
  }} catch(err) {
    if (isValidationError(err)) {
    res.status(400).send({ error: 'Validation error', details: err });
    } else if (err instanceof UniqueConstraintError) {
    res.status(409).send({ error: 'Customer with this name already exists' });
    } else {
    console.error('Error while updating customer:', err);
    res.status(500).send({ error: 'Internal server error' });
    }
  }
}

export { get, create, remove, update };

import { Request, Response } from 'express';
import Inventory from '../models/inventoryModel';
import { plainToInstance } from 'class-transformer';
import { CreateInventory, UpdateInventory } from '../schemas/inventorySchema';
import { validateOrReject } from 'class-validator';
import { isValidationError } from '../helpers/validation';
import { UniqueConstraintError } from 'sequelize';

async function get(req: Request, res: Response) {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (err) {
    console.error(`Error fetching inventory: ${err}`);
    res.status(500).json({ error: err });
  }
}

async function create(req: Request, res: Response) {
  try {
    const inventory = plainToInstance(CreateInventory, req.body);
    await validateOrReject(inventory);
    const createdInventory = await Inventory.create({
      ...inventory,
    });
    res.status(201).send(createdInventory);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).send({ error: 'Validation error', details: err });
    } else {
      console.error('Error while creating inventory:', err);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

async function remove(req: Request, res: Response) {
    try {
        const inventoryId = req.params.id;
        const inventory = await Inventory.findByPk(inventoryId);
        if (!inventory) {
            res.status(404).json({ error: 'Inventory not found' });
        } else {
            await inventory.destroy();
            res.status(200).json({ message: `Inventory with Id: ${inventoryId} deleted` });
    }} catch (err) {
        console.error(`Error while deleting inventory: ${err}`);
        res.status(500).json({ error: err });
    }
}

async function update(req: Request, res: Response) {
    try {
        const inventoryId = req.params.id;
        const existingInventory = await Inventory.findByPk(inventoryId);
        const inventory = plainToInstance(UpdateInventory, req.body);
        await validateOrReject(inventory);
        if (!existingInventory) {
            res.status(404).json({ error: 'Inventory not found' });
        } else {
            await existingInventory.update({
                ...inventory,
            });
            res.status(200).json({ message: `Inventory with Id: ${inventoryId} updated` });
    }} catch (err) {
        if (isValidationError(err)) {
            res.status(400).send({ error: 'Validation error', details: err });
        } else {
            console.error(`Error while updating inventory: ${err}`);
            res.status(500).json({ error: err });
        }
    }
}

export { get, create, remove, update };
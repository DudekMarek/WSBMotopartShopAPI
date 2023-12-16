import { Request, Response } from "express";
import Product from "../models/productModel";
import Inventory from "../models/inventoryModel";
import { CreateInventory, UpdateInventory } from "../schemas/inventorySchema";
import { plainToInstance } from "class-transformer";
import { ensureExists, getEntityById } from "../services/relationService";
import { validateInstance, handleError } from "../helpers/validation";

async function get(req: Request, res: Response) {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (err) {
    handleError(err, res);
  } 
}

async function create(req: Request, res: Response) {
  try {
    const inventory = plainToInstance(CreateInventory, req.body);
    await validateInstance(inventory);
    // Ensure product exists
    await ensureExists(Product, inventory.productId);
    const createdInventory = await Inventory.create({ ...inventory });
    res.status(201).send(createdInventory);
  } catch(err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const inventoryId = parseInt(req.params.id, 10);
    const existingInventory = await getEntityById(Inventory, inventoryId);
    existingInventory.destroy();
    res.status(200).json({ message: `Inventory with id ${inventoryId} deleted` })
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const inventoryId = parseInt(req.params.id);
    const existingInventory = await getEntityById(Inventory, inventoryId);
    const inventory = plainToInstance(UpdateInventory, req.body);
    await validateInstance(inventory);
    await ensureExists(Product, inventory.productId);
    const updatedInventory = await existingInventory.update(inventory);
    res.status(200).send(updatedInventory)
  } catch(err) {
    handleError(err, res);
  }
}

export { get, create, remove, update };
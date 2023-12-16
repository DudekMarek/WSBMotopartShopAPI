import { Request, Response } from "express";
import Category from "../models/categoryModel";
import { CreateCategory, UpdateCategory } from "../schemas/categorySchema";
import { plainToInstance } from "class-transformer";
import { getEntityById } from "../services/relationService";
import { validateInstance, handleError } from "../helpers/validation";

async function get(req: Request, res: Response) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
    const category = plainToInstance(CreateCategory, req.body);
    await validateInstance(category);
    const createdCategory = await Category.create({ ...category });
    res.status(201).send(createdCategory);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    const existingCategory = await getEntityById(Category, categoryId);
    await existingCategory.destroy();
    res.status(200).json({ message: `Category with id ${categoryId} deleted` });
  } catch(err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    const existingCategory = await getEntityById(Category, categoryId);
    const category = plainToInstance(UpdateCategory, req.body);
    await validateInstance(category);
    const updatedCategory = await existingCategory.update(category);
    res.status(200).json(updatedCategory);
  } catch(err) {
    handleError(err, res);
  }
}

export { get, create, remove, update };

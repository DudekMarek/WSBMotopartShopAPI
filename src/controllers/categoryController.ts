import { Request, Response } from "express";
import Category from "../models/categoryModel";
import { validateOrReject } from "class-validator";
import { isValidationError } from "../helpers/validation";
import { plainToInstance } from "class-transformer";
import { CreateCategory, UpdateCategory } from "../schemas/categorySchema";
import { UniqueConstraintError } from "sequelize";

async function get(req: Request, res: Response) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
    } catch (err) {
    console.error(`Error fetching categories: ${err}`);
    res.status(500).json({ error: err });
    }
}

async function create(req: Request, res: Response) {
  try {
    const category = plainToInstance(CreateCategory, req.body);
    await validateOrReject(category);
    const createdCategory = await Category.create({
      ...category,
    });
    res.status(201).send(createdCategory);
  } catch (err) {
    if (isValidationError(err)) {
      res.status(400).send({ error: "Validation error", details: err });
    } else if (err instanceof UniqueConstraintError) {
      res.status(409).send({ error: "Category with this name already exists" });
    } else {
      console.error("Error while creating category:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
}

async function remove(req: Request, res: Response) {
  try{
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);
  if (!category) {
    res.status(404).json({ error: "Category not found" });
  } else {
    await category.destroy();
    res.status(200).json({ message: `Category with Id: ${categoryId} deleted` });
  }} catch(err) {
    console.error(`Error while deleting category: ${err}`);
    res.status(500).json({ error: err });
  }}

async function update(req: Request, res: Response) {
  try {
  const categoryId = req.params.id;
  const category = plainToInstance(UpdateCategory, req.body);
  await validateOrReject(category);
  const existingCategory = await Category.findByPk(categoryId);
  if (!existingCategory) {
    res.status(404).json({ error: "Category not found" });
  } else {
    await existingCategory.update(category);
    res.status(200).json(category);
  }} catch(err) {
    if (isValidationError(err)) {
      res.status(400).send({ error: "Validation error", details: err });
    } else if (err instanceof UniqueConstraintError) {
      res.status(409).send({ error: "Category with this name already exists" });
    } else {
      console.error("Error while updating category:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
}

export { get, create, remove, update };

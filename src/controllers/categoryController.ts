import { Request, Response } from "express";
import Category from "../models/categoryModel";

function get(req: Request, res: Response) {
  Category.findAll()
    .then((Category) => {
      res.json(Category);
    })
    .catch((err) => {
      console.error(`Error fetching Category: ${err}`);
      res.status(500).json({ error: err });
    });
}

function create(req: Request, res: Response) {
  const newCategory = req.body;

  if (!newCategory || !newCategory.categoryName) {
    res.status(400).json({ error: "Incomplete or invalid category data" });
  }

  Category.create(newCategory)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function remove(req: Request, res: Response) {
  const categoryId = req.params.id;

  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        return category.destroy();
      }
    })
    .then(() => {
      res
        .status(200)
        .json({ message: `Customer with Id: ${categoryId} deleted` });
    })
    .catch((err) => {
      console.error(`Error while deleting category: ${err}`);
      res.status(500).json({ error: err });
    });
}

function update(req: Request, res: Response) {
  const categoryId = req.params.id;
  const updatedCategory = req.body;

  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        return category.update(updatedCategory);
      }
    })
    .then(() => {
      res
        .status(200)
        .json({ message: `Category with Id: ${categoryId} updated` });
    })
    .catch((err) => {
      console.error(`Error while updating category: ${err}`);
      res.status(500).json({ error: err });
    });
}

export { get, create, remove, update };

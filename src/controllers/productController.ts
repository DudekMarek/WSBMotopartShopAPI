import { Request, Response } from "express";
import Product from "../models/productModel";
import { validateOrReject } from "class-validator"
import { isValidationError } from "../helpers/validation";
import { plainToInstance } from "class-transformer"
import {CreateProduct, UpdateProduct } from "../schemas/productSchema"
import { UniqueConstraintError } from "sequelize";

async function get(req: Request, res: Response) {
  try {
      const products = await Product.findAll();
      res.json(products);
  } catch (err) {
      console.error(`Error fetching products: ${err}`);
      res.status(500).json({ error: err });
  }
}

async function create(req: Request, res: Response) {
  try {
      const product = plainToInstance(CreateProduct, req.body);
      await validateOrReject(product);
      const createdProduct = await Product.create({
      ...product
      });
      res.status(201).send(createdProduct);
  } catch(err) {
    if (isValidationError(err)) {
    res.status(400).send({ error: 'Validation error', details: err });
    } else if (err instanceof UniqueConstraintError) {
    res.status(409).send({ error: 'Product with this name already exists' });
    } else {
    console.error('Error while creating product:', err);
    res.status(500).send({ error: 'Internal server error' });
    }
  }
}

async function remove(req: Request, res: Response) {
  try{
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({error: "Product not found"});
    } else {
      await product.destroy();
      res.status(200).json({message: `Product with Id: ${productId} deleted`});
    }
  } catch(err) {
    console.error(`Error while deleting product: ${err}`);
    res.status(500).json({error: err});
  }
}

async function update(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findByPk(productId);
    const product = plainToInstance(UpdateProduct, req.body);
    await validateOrReject(product);
    if (!existingProduct) {
      res.status(404).json({error: "Product not found"});
    } else {
      await existingProduct.update({
        ...product
      });
      res.status(200).json({message: `Product with Id: ${productId} updated`});
    }} catch(err) {
    if (isValidationError(err)) {
      res.status(400).send({ error: 'Validation error', details: err });
    } else if (err instanceof UniqueConstraintError) {
      res.status(409).send({ error: 'Product with this name already exists' });
    } else {
      console.error(`Error while updating product: ${err}`);
      res.status(500).json({error: err});
    }
  }
}

export { get, create, remove, update }
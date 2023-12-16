import { Request, Response } from "express";
import Product from "../models/productModel";
import {CreateProduct, UpdateProduct } from "../schemas/productSchema"
import { plainToInstance } from "class-transformer"
import { getEntityById } from '../services/relationService'
import { validateInstance, handleError } from "../helpers/validation";

async function get(req: Request, res: Response) {
  try {
    const products = await Product.findAll();
    res.json(products);    
  } catch(err) {
    handleError(err, res);
  }

}

async function create(req: Request, res: Response) {
  try {
    const product = plainToInstance(CreateProduct, req.body);
    await validateInstance(product);
    const createdProduct = await Product.create({ ...product });
    res.status(201).send(createdProduct);
  } catch(err) {
    handleError(err, res);
  }
}

async function update(req:Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10);
    const existingProduct = await getEntityById(Product, productId)
    const product = plainToInstance(UpdateProduct, req.body);
    await validateInstance(product);
    const updatedProduct = await existingProduct.update(product);
    res.status(200).send(updatedProduct);
  } catch(err) {
    handleError(err, res);
  }
}

async function remove(req:Request, res: Response) {
  try {
    const productId = parseInt(req.params.id, 10);
    const existingProduct = await getEntityById(Product, productId);
    await existingProduct.destroy();
    res.status(200).json({ message: `Product with ${productId} deleted` });
  } catch(err) {
    handleError(err, res);
  }
}

export { get, create, remove, update }
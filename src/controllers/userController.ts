import { Request, Response } from "express";
import User from "../models/userModel";
import {CreateUser, UpdateUser } from "../schemas/userSchema"
import { plainToInstance } from "class-transformer"
import { getEntityById } from "../services/relationService"
import { validateInstance, handleError } from "../helpers/validation";



async function get(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    handleError(err, res);
  }
}

async function create(req: Request, res: Response) {
  try {
    const user = plainToInstance(CreateUser, req.body);
    await validateInstance(user);
    const createdUser = await User.create({ ...user });
    res.status(201).send(createdUser);
  } catch (err) {
    handleError(err, res);
  }
}

async function update(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10);
    const existingUser = await getEntityById(User, userId)
    const user = plainToInstance(UpdateUser, req.body);
    await validateInstance(user);
    const updatedUser = await existingUser.update(user);
    res.status(200).send(updatedUser);
  } catch (err) {
    handleError(err, res);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const existingUser = await getEntityById(User, userId);
    await existingUser.destroy();
    res.status(200).json({ message: `User with id ${userId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}

export { get, create, remove, update }

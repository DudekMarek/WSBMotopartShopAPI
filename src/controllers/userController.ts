import { Request, Response } from "express";
import User from "../models/userModel";
import {CreateUser, UpdateUser } from "../schemas/userSchema"
import { plainToInstance } from "class-transformer"
import { EntityNotFoundError, validateInstance, handleError } from "../helpers/validation";



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
    const userId = req.params.id;
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      throw new EntityNotFoundError('User not found');
    }
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
    const userId = req.params.id;
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      throw new EntityNotFoundError('User not found');
    }
    await existingUser.destroy();
    res.status(200).json({ message: `User with Id: ${userId} deleted` });
  } catch (err) {
    handleError(err, res);
  }
}


// async function get(req: Request, res: Response) {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (err) {
//     console.error(`Error fetching users: ${err}`);
//     res.status(500).json({ error: err });
//   }
// }

// async function create(req: Request, res: Response) {
//   try {
//     const user = plainToInstance(CreateUser, req.body);
//     await validateOrReject(user);
//     const createdUser = await User.create({
//       ...user
//     });
//     res.status(201).send(createdUser);
//   } catch(err) {
//       if (isValidationError(err)) {
//       res.status(400).send({ error: 'Validation error', details: err });
//     } else if (err instanceof UniqueConstraintError) {
//       res.status(409).send({ error: 'User with this username already exists' });
//     } else {
//       console.error('Error while creating user:', err);
//       res.status(500).send({ error: 'Internal server error' });
//     }
//   }
// }


// async function remove(req: Request, res: Response) {
//   try {
//     const userId = req.params.id;
//     const user = await User.findByPk(userId);
//     if (!user) {
//       res.status(404).json({error: "User not found"});
//     } else {
//       await user.destroy();
//       res.status(200).json({message: `User with Id: ${userId} deleted`});
//     }
//   } catch(err) {
//     console.error(`Error while deleting user: ${err}`);
//     res.status(500).json({error: err});
//   }
// }

// async function update(req: Request, res: Response) {
//   try {
//     const userId = req.params.id;
//     const existingUser = await User.findByPk(userId);
//     const user = plainToInstance(UpdateUser, req.body);
//     await validateOrReject(user);
//     if (!existingUser) {
//       res.status(404).json({error: "User not found"});
//     } else {
//       await existingUser.update(user);
//       res.status(200).json(user);
//     }} catch(err) {
//     if (isValidationError(err)) {
//       res.status(400).send({ error: 'Validation error', details: err });
//     } else if (err instanceof UniqueConstraintError) {
//       res.status(409).send({ error: 'User with this username already exists' });
//     } else {
//       console.error(`Error while updating user: ${err}`);
//       res.status(500).json({error: err});
//     }
//   }
// }

export { get, create, remove, update }

import { Request, Response } from "express";
import User from "../models/userModel";
import { validateOrReject } from "class-validator"
import { plainToInstance } from "class-transformer"
import {CreateUser} from "../schemas/userSchema"

function get(req: Request, res: Response) {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(`Error fetching users: ${err}`);
      res.status(500).json({ error: err });
    });
}

function create(req: Request, res: Response) {
  const user = plainToInstance(CreateUser, req.body)
  validateOrReject(user)
    .then((obj) => console.log(obj))
    .catch((err) => {console.error(`Error while creating user ${err}`)});

  // if (!user || !user.username || !user.password || !user.userType) {
  //   return res.status(400).json({ error: "Incomplete or invalid user data" });
  // }
  // User.create(user)
  //   .then((user) => {
  //     res.json({
  //       message: `User created`,
  //       user: user,
  //     });
  //   })
  //   .catch((err) => {
  //     console.error(`Error while updating creating: ${err}`);
  //     res.json({ error: err });
  //   });
}

function remove(req: Request, res: Response) {
  const userId = req.params.id;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        return user.destroy();
      }
    })
    .then(() => {
      res.status(200).json({ message: `User with Id: ${userId} deleted` });
    })
    .catch((err) => {
      console.error(`Error while deleting user: ${err}`);
      res.status(500).json({ error: err });
    });
}

function update(req: Request, res: Response) {
  const userId = req.params.id;
  const updatedUser = req.body;

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        return user.update(updatedUser);
      }
    })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(`Error while updating user: ${err}`);
      res.status(500).json({ error: err });
    });
}

export { get, create, remove, update };

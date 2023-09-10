import { Request, Response, NextFunction } from "express";
import * as service from "./service";

import { User, getUsersParamsProps } from "../../types/types";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<User>> => {
  try {
    const params: getUsersParamsProps =
      req.query as unknown as getUsersParamsProps;
    const result = await service.getUsers(params);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).send("Problem with finding users");
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<User>> => {
  try {
    const { id } = req.params;
    const result = await service.getUserById(id);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send("User not found");
    next(e);
  }
};

export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<User>> => {
  try {
    const user: User = req.body;
    console.log(req.body);
    const result = await service.addNewUser(user);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send("User not found");
    next(e);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<User>> => {
  try {
    console.log("asd");
    const user: User = req.body;
    console.log(user);
    const { id } = req.params;
    console.log(id);
    const result = await service.updateUser(user, id);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).send("User not found");
    next(e);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const result = await service.deleteUser(id);
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error while deleting user");
    next(e);
  }
};

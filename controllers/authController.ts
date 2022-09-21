import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response) => {
  res.json({ token: "token" });
};

export const updateUser = async (req: Request, res: Response) => {
  res.send("updateUser");
};

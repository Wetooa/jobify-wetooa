import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFound } from "../errors";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, password2 } = req.body;

  if (!username || !email || !password || !password2) {
    throw new BadRequestError("please provide all values");
  }
  if (password !== password2) {
    throw new BadRequestError("passwords don't match");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use!");
  }

  const user: any = await User.create({
    username,
    email,
    password,
  });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastname,
      username: user.username,
    },
    token,
    location: user.location,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }
  console.log("1");

  const user: any = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Invalid Credentials");
  }
  console.log("2");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("entered the wrong password");
  }
  console.log("3");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token });
};

export const updateUser = async (req: Request, res: Response) => {
  res.send("updateUser");
};

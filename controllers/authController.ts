import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFound, UnauthenticatedError } from "../errors";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, password2 } = req.body;

  if (!username || !email || !password || !password2) {
    throw new BadRequestError("Please provide all values!");
  }
  if (password !== password2) {
    throw new BadRequestError("Passwords don't match!");
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
      lastname: user.lastname,
      username: user.username,
    },
    token,
    location: user.location,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user: any = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Password");
  }

  user.password = undefined;
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  res.send("updateUser");
};

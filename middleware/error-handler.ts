import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(StatusCodes.BAD_REQUEST).json({ msg: "There was an error" });
};

export default errorHandler;

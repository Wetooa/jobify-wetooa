import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later",
  };

  // missing field
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
  }

  // not unique email
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    // const finalSentence = mySentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

    // my own regex (^\w{1})|((?<=\s)\w) hehe cool amiraight

    defaultError.msg = `${err.keyValue.email} is already in use! ${
      Object.keys(err.keyValue)[0][0].toUpperCase() +
      Object.keys(err.keyValue)[0].substring(1)
    } must be unique`;
  }

  res
    .status(defaultError.statusCode)
    .json({ error: err, msg: defaultError.msg });
  // res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandler;

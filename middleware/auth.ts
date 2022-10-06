import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors";

interface Payload {
  userId: string;
  username: string;
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization && !authorization?.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No valid token!");
  }
  const token = authorization.split(" ")[1];

  try {
    // ok this is new cool learning
    // with "as JwtPayload", it treats payload as either a string or a JwtPayload, so it recieves an error if i treat as an obect
    // add "as JwtPayload" so it considers this an object rather than a string
    // that or we can just use our own interface :P hahahahahha

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
    req.body.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Access is restricted!");
  }
};

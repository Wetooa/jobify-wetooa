import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import Job from "../models/Job";

export const createJob = async (req: Request, res: Response) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Provide all values!");
  }

  req.body.createdBy = req.body.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const getAllJobs = async (req: Request, res: Response) => {
  const { userId, username } = req.body.user;
  res.send(userId);
};

export const updateJob = async (req: Request, res: Response) => {
  res.send("update jobs");
};

export const deleteJob = async (req: Request, res: Response) => {
  res.send("delete jobs");
};

export const showStats = async (req: Request, res: Response) => {
  res.send("show stats");
};

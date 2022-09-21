import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createJob = async (req: Request, res: Response) => {
  res.send("create jobs");
};

export const getAllJobs = async (req: Request, res: Response) => {
  res.send("get all jobs");
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

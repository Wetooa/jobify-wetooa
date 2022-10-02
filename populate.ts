// lol i legit turned whatever complicated thing smilga did on his file to a simple await readFile("./jobify-jobs.json", "utf8")

import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./database/db";
import Job from "./models/Job";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile("./jobify-jobs.json", "utf8")
    );
    await Job.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

import "dotenv/config";
import "colors";
import "express-async-errors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

// db and authenticateUser
import connectDB from "./database/db";

// routes
import authRouter from "./routes/authRoutes";
import jobsRoute from "./routes/jobsController";

// middleware
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

// additional middleware
import "helmet";
import "cors";
import "express-rate-limit";
import "xss-clean";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req: Request, res: Response) => {
  throw new Error("Test");
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    const url = process.env.MONGO_URI;
    connectDB(url);

    const port = process.env.PORT;
    app.listen(port, () =>
      console.log(`[server]: Server started on port ${port}`.cyan.underline)
    );
  } catch (error) {
    console.log(error);
  }
};
start();

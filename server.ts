import "dotenv/config";
import "colors";
import "express-async-errors";
import morgan from "morgan";
import express, { Application, Request, Response } from "express";
const app: Application = express();

import path from "path";

// db and authenticateUser
import connectDB from "./database/db";

// routes
import authRouter from "./routes/authRoutes";
import jobsRoute from "./routes/jobsController";

// middleware
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import { authenticateUser } from "./middleware/auth";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// build application
app.use(express.static(path.resolve(__dirname, "./client/build")));

// additional middleware
// u can add an object with origin inside cors to set which domains can access ur server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet()); // secure headers
app.use(xss()); // prevent cross side scripting
app.use(mongoSanitize()); // prevent mongodb injection

// routes
app.get("/api/v1", (req: Request, res: Response) => {
  res.json({ msg: "test!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRoute);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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

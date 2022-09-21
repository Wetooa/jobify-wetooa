import "dotenv/config";
import "colors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.get("/", (req: Request, res: Response) => {
  throw new Error("Test");
  res.send("Welcome!");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    const port = process.env.PORT;
    app.listen(port, () =>
      console.log(`[server]: Server started on port ${port}`.cyan.underline)
    );
  } catch (error) {
    console.log(error);
  }
};
start();

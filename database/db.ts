import "colors";
import mongoose from "mongoose";

const connectDB = (url: string | undefined) => {
  return (
    mongoose
      // non null assertion operator, since url might be undefined, assure connectdb that at this must, it must not be underfined

      .connect(url!)
      .then(() =>
        console.log(`[mongoDB]: Connected to MongoDB`.yellow.underline)
      )
  );
};

export default connectDB;

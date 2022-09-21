import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide an password"],
    minlength: 6,
  },

  // optional
  lastname: {
    type: String,
    maxlength: 30,
    trim: true,
    default: "lastname",
  },
  location: {
    type: String,
    trime: true,
    maxlength: 20,
    default: "my city",
  },
});

export default mongoose.model("User", UserSchema);

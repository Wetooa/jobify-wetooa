import mongoose, { Schema, SchemaType } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    select: false,
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

UserSchema.pre("save", async function () {
  // --IMPORTANT--, if you want this to run once updating, use User.save in controller.ts... updating wont trigger this remember

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function (): string {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_LIFETIME! }
  );
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);

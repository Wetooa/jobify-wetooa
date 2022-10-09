"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (url) => {
    return (mongoose_1.default
        // non null assertion operator, since url might be undefined, assure connectdb that at this must, it must not be underfined
        .connect(url)
        .then(() => console.log(`[mongoDB]: Connected to MongoDB`.yellow.underline)));
};
exports.default = connectDB;

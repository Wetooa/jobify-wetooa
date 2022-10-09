"use strict";
// lol i legit turned whatever complicated thing smilga did on his file to a simple await readFile("./jobify-jobs.json", "utf8")
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./database/db"));
const Job_1 = __importDefault(require("./models/Job"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.default)(process.env.MONGO_URI);
        yield Job_1.default.deleteMany();
        const jsonProducts = JSON.parse(yield (0, promises_1.readFile)("./jobify-jobs.json", "utf8"));
        yield Job_1.default.create(jsonProducts);
        console.log("Success!!!!");
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
start();

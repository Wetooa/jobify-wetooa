"use strict";
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
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization && !(authorization === null || authorization === void 0 ? void 0 : authorization.startsWith("Bearer "))) {
        throw new errors_1.UnauthenticatedError("No valid token!");
    }
    const token = authorization.split(" ")[1];
    try {
        // ok this is new cool learning
        // with "as JwtPayload", it treats payload as either a string or a JwtPayload, so it recieves an error if i treat as an obect
        // add "as JwtPayload" so it considers this an object rather than a string
        // that or we can just use our own interface :P hahahahahha
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.user = { userId: payload.userId, username: payload.username };
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Access is restricted!");
    }
});
exports.authenticateUser = authenticateUser;

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
exports.updateUser = exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, password2 } = req.body;
    if (!username || !email || !password || !password2) {
        throw new errors_1.BadRequestError("Please provide all values!");
    }
    if (password !== password2) {
        throw new errors_1.BadRequestError("Passwords don't match!");
    }
    const userAlreadyExists = yield User_1.default.findOne({ email });
    if (userAlreadyExists) {
        throw new errors_1.BadRequestError("Email already in use!");
    }
    const user = yield User_1.default.create({
        username,
        email,
        password,
    });
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastname: user.lastname,
            username: user.username,
        },
        token,
        location: user.location,
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide all values!");
    }
    const user = yield User_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials!");
    }
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        throw new errors_1.UnauthenticatedError("Invalid Password!");
    }
    user.password = undefined;
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user,
        token,
        location: user.location,
    });
});
exports.login = login;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, lastname, location } = req.body;
    if (!email || !username || !lastname || !location) {
        throw new errors_1.BadRequestError("Please provide all values!");
    }
    const user = yield User_1.default.findOne({ _id: req.body.user.userId });
    user.username = username;
    user.email = email;
    user.location = location;
    user.lastname = lastname;
    user.save();
    const token = user.createJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json({ user, token, location: user.location });
});
exports.updateUser = updateUser;

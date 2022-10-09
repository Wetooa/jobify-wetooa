"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logo_svg_1 = __importDefault(require("../assets/images/logo.svg"));
const Logo = () => {
    return <img src={logo_svg_1.default} alt="jobify" className="logo"/>;
};
exports.default = Logo;

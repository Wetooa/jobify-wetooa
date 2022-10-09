"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const not_found_svg_1 = __importDefault(require("../assets/images/not-found.svg"));
const ErrorPage_1 = __importDefault(require("../assets/wrappers/ErrorPage"));
const Error = () => {
    return (<ErrorPage_1.default className="full-page">
      <div>
        <not_found_svg_1.default src={not_found_svg_1.default} alt="not found"/>
        <h3>ohh! page not found</h3>
        <p>Go back to the home page</p>
        <react_router_dom_1.Link to="/">back home</react_router_dom_1.Link>
      </div>
    </ErrorPage_1.default>);
};
exports.default = Error;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_alternative_svg_1 = __importDefault(require("../assets/images/main-alternative.svg"));
const LandingPage_1 = __importDefault(require("../assets/wrappers/LandingPage"));
const components_1 = require("../components");
const react_router_dom_1 = require("react-router-dom");
function Landing() {
    return (<LandingPage_1.default>
      <nav>
        <components_1.Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem non
            et veritatis vitae. Recusandae aut doloremque, cum ut voluptatibus
            cupiditate?
          </p>
          <react_router_dom_1.Link to="/register" className="btn btn-hero">
            Login/Register
          </react_router_dom_1.Link>
        </div>
        <img src={main_alternative_svg_1.default} alt="job hunt" className="img main-img"/>
      </div>
    </LandingPage_1.default>);
}
exports.default = Landing;

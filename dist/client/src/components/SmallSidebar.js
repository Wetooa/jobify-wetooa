"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallSidebar_1 = __importDefault(require("../assets/wrappers/SmallSidebar"));
const Logo_1 = __importDefault(require("./Logo"));
const links_1 = __importDefault(require("../utils/links"));
const NavLinks_1 = __importDefault(require("./NavLinks"));
const fa_1 = require("react-icons/fa");
const appContext_1 = require("../context/appContext");
function SmallSidebar() {
    const { showSidebar, toggleSidebar } = (0, appContext_1.useAppContext)();
    return (<SmallSidebar_1.default>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <button className="close-btn" type="button" onClick={toggleSidebar}>
            <fa_1.FaTimes />
          </button>
          <header>
            <Logo_1.default />
          </header>
          <div className="nav-links">
            {links_1.default.map((link) => {
            return (<NavLinks_1.default key={link.id} {...link} toggleSidebar={toggleSidebar}/>);
        })}
          </div>
        </div>
      </div>
    </SmallSidebar_1.default>);
}
exports.default = SmallSidebar;

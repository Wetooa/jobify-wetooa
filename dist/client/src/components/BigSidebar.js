"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BigSidebar_1 = __importDefault(require("../assets/wrappers/BigSidebar"));
const Logo_1 = __importDefault(require("./Logo"));
const links_1 = __importDefault(require("../utils/links"));
const NavLinks_1 = __importDefault(require("./NavLinks"));
const appContext_1 = require("../context/appContext");
function BigSidebar() {
    const { showSidebar } = (0, appContext_1.useAppContext)();
    return (<BigSidebar_1.default>
      <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
        <div className="content">
          <header>
            <Logo_1.default />
          </header>
          <div className="nav-links">
            {links_1.default.map((link) => {
            return <NavLinks_1.default key={link.id} {...link}/>;
        })}
          </div>
        </div>
      </div>
    </BigSidebar_1.default>);
}
exports.default = BigSidebar;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Navbar_1 = __importDefault(require("../assets/wrappers/Navbar"));
const fa_1 = require("react-icons/fa");
const Logo_1 = __importDefault(require("./Logo"));
const appContext_1 = require("../context/appContext");
const react_1 = require("react");
function NavBar() {
    const { user, toggleSidebar, signOut } = (0, appContext_1.useAppContext)();
    const [showLogout, setShowLogout] = (0, react_1.useState)(false);
    // use navlinks, they cool
    // use their active parameter to do cool thing
    return (<Navbar_1.default>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <fa_1.FaAlignLeft />
        </button>

        <div>
          <Logo_1.default />
          <h3 className="logo-text">Dashboard</h3>
        </div>

        <div className="btn-container">
          <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)}>
            <fa_1.FaUserCircle />
            {user === null || user === void 0 ? void 0 : user.username}
            <fa_1.FaCaretDown />
          </button>

          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={signOut}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Navbar_1.default>);
}
exports.default = NavBar;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const SharedLayout_1 = __importDefault(require("../../assets/wrappers/SharedLayout"));
const components_1 = require("../../components");
function SharedLayout() {
    return (
    // so i'll not forget, use "end to="/" to setup an index path for navlinks, i forgot why exactly basta its needed"
    // wrapper is grid but only 1 column if less than 992px, else, it still is a grid but now has two columns, right side being auto, left side taking up the rest
    <SharedLayout_1.default>
      <main className="dashboard">
        {/* this is 1 column */}
        <components_1.SmallSidebar />
        <components_1.BigSidebar />

        {/* this is another column */}
        <div>
          <components_1.NavBar />
          <div className="dashboard-page">
            <react_router_dom_1.Outlet />
          </div>
        </div>
      </main>
    </SharedLayout_1.default>);
}
exports.default = SharedLayout;

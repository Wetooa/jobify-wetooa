"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const NavLinks = (navlinkProps) => {
    // this might not be the perfect place to put this basta const {password, ..result} = user ----> guard clause gaming
    const { text, path, id, icon, toggleSidebar } = navlinkProps;
    return (<react_router_dom_1.NavLink end to={path} key={id} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={toggleSidebar}>
      <span className="icon">{icon}</span>
      {text}
    </react_router_dom_1.NavLink>);
};
exports.default = NavLinks;

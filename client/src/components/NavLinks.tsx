import { NavLink } from "react-router-dom";
import { LinkProps } from "./interfaces";

const NavLinks = (navlinkProps: LinkProps) => {
  // this might not be the perfect place to put this basta const {password, ..result} = user ----> guard clause gaming

  const { text, path, id, icon, toggleSidebar } = navlinkProps;
  return (
    <NavLink
      end
      to={path}
      key={id}
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      onClick={toggleSidebar}
    >
      <span className="icon">{icon}</span>
      {text}
    </NavLink>
  );
};
export default NavLinks;

import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <NavLink
        end
        to="/"
        className={({ isActive }) => (isActive ? "bg-red-500" : "")}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "bg-red-500" : "")}
      >
        Register
      </NavLink>
      <NavLink
        to="/landing"
        className={({ isActive }) => (isActive ? "bg-red-500" : "")}
      >
        Landing
      </NavLink>
    </nav>
  );
}

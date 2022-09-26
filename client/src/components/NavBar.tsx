import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";

export default function NavBar() {
  const { removeUserToLocalStorage } = useAppContext();
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

      <button onClick={removeUserToLocalStorage}>remove user</button>
    </nav>
  );
}

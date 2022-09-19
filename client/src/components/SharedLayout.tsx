import { Outlet } from "react-router-dom";
import { NavBar } from "../components";

function SharedLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
export default SharedLayout;

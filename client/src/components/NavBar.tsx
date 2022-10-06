import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useAppContext } from "../context/appContext";
import { useState } from "react";

function NavBar() {
  const { user, toggleSidebar, signOut } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);

  // use navlinks, they cool
  // use their active parameter to do cool thing
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>

        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.username}
            <FaCaretDown />
          </button>

          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={signOut}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default NavBar;

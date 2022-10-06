import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./Logo";
import links from "../utils/links";
import NavLinks from "./NavLinks";
import { FaTimes } from "react-icons/fa";
import { LinkProps } from "./interfaces";
import { useAppContext } from "../context/appContext";

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" type="button" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link: LinkProps) => {
              return (
                <NavLinks
                  key={link.id}
                  {...link}
                  toggleSidebar={toggleSidebar}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default SmallSidebar;

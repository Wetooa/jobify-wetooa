import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import links from "../utils/links";
import NavLinks from "./NavLinks";
import { useAppContext } from "../context/appContext";
import { LinkProps } from "./interfaces";

function BigSidebar() {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link: LinkProps) => {
              return <NavLinks {...link} />;
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default BigSidebar;

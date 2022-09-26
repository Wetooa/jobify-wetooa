import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { NavBar, SmallSidebar, BigSidebar } from "../../components";

function SharedLayout() {
  return (
    // so i'll not forget, use "end to="/" to setup an index path for navlinks, i forgot why exactly basta its needed"

    // wrapper is grid but only 1 column if less than 992px, else, it still is a grid but now has two columns, right side being auto, left side taking up the rest
    <Wrapper>
      <main className="dashboard">
        {/* this is 1 column */}
        <SmallSidebar />
        <BigSidebar />

        {/* this is another column */}
        <div>
          <NavBar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
export default SharedLayout;

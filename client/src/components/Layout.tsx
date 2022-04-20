import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
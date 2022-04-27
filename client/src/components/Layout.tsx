import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  window.scrollTo(0, 0);

  console.log('layyyyout')
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
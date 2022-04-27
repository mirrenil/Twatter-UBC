
import { Outlet, useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  window.scrollTo(0, 0);

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <ErrorBoundary onGoBack={() => navigate("/")}>
      <Outlet />
       </ErrorBoundary>
    </div>
  );
};

export default Layout;
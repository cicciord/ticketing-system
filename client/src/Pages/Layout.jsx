import { Navbar, Container, Button } from "react-bootstrap";
import { MdAdminPanelSettings } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../hooks";

function Layout() {
  const { user, isLoading, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleHomePress = () => {
    navigate("/");
  };

  const handleLoginPress = () => {
    navigate("/login");
  };

  const handleLogoutPress = () => {
    logout();
  };

  return (
    <>
      <Navbar
        className="shadow border-bottom border-secondary"
        bg="dark"
        data-bs-theme="dark"
        fixed="top"
      >
        <Container >
          <Navbar.Brand href="#" onClick={handleHomePress}>
            Ticketing System
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn && (
              <Navbar.Text className="mx-3 d-flex align-items-center">
                {user?.username}{" "}
                {user?.admin ? <MdAdminPanelSettings className="mx-2" /> : ""}{" "}
              </Navbar.Text>
            )}
            {isLoggedIn ? (
              <Button
                variant="secondary"
                onClick={handleLogoutPress}
                disabled={isLoading}
              >
                Log Out
              </Button>
            ) : (
              <Button
                onClick={handleLoginPress}
                disabled={pathname === "/login"}
              >
                Log In
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="d-flex flex-column align-items-center" style={{marginTop: "6em"}}>
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;

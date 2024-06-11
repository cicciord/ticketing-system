import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar className="shadow mb-5" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Ticketing System</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button>Log In</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container >
        <Outlet />
      </Container>
    </>
  );
}

export default Layout;

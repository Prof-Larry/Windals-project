import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../Logo/logo.png";

export default function NavbarAdmin() {
  return (
    <div className="navbaradmin">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <strong>
                <Navbar.Brand href="/adminhome" className="mx-5">
                  Admin Home
                </Navbar.Brand>
              </strong>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

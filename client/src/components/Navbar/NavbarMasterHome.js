import React from "react";
import { useHistory } from "react-router";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../Logo/logo.png";

export default function NavbarAdminHome() {

    const history = useHistory();

    const goToSearchbydate = () => {
        localStorage.setItem("reports", JSON.stringify([]));
        history.push("/searchbydate");
      };

      const goToAdminRegister = () => {
        history.push("/adminregister");
      };


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
            <Nav className="mx-4">
                <strong><Nav.Link onClick={goToSearchbydate}>Show Reports</Nav.Link></strong>
                <strong><Nav.Link >Edit Drop-Downs</Nav.Link></strong>
                <strong><Nav.Link onClick={goToAdminRegister}>Employee Registration</Nav.Link></strong>
                
            </Nav>
                <strong><Navbar.Brand className="mx-3" href="/">Home</Navbar.Brand></strong>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
import React from "react";
import { useHistory } from "react-router";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../Logo/logo.png";
import Cookies from 'universal-cookie';
const cookie = new Cookies();

export default function NavbarAdminHome() {

  const history = useHistory();

  const goToSearchbydate = () => {
    localStorage.setItem("reports", JSON.stringify([]));
    history.push("/searchbydate");
  };

  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:5050/adminlogout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      history.push("/adminlogin");
    }
  };

  const goToAdminRegister = () => {
    history.push("/adminregister");
  };
  const goToEditDropdowns = () => {
    history.push("/editdropdown");
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
              <strong><Nav.Link onClick={goToEditDropdowns}>Edit Drop-Downs</Nav.Link></strong>
              <strong><Nav.Link onClick={goToAdminRegister}>Employee Registration</Nav.Link></strong>

            </Nav>
            <strong><Navbar.Brand className="mx-3 btn btn-danger" onClick={logOut}>Log Out</Navbar.Brand></strong>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
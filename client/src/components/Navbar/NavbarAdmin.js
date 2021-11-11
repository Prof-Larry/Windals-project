import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar,Nav,Container,Col } from 'react-bootstrap'
import Logo from '../Logo/logo.png'

export default function NavbarAdmin() {
    return (
        <div className="navbaradmin">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home"><img src={Logo}/>WINDALS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav >
                        <Nav.Link  href="/adminhome">Admin Home</Nav.Link>
                        <Nav.Link  href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
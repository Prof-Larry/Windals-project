import React from 'react'
import {Navbar,Container,Nav,Button,ButtonGroup} from 'react-bootstrap'
import { Link, } from 'react-router-dom'



export default function SubmitReport() {
    return (
        <div className="SubmitReport">
        <Container>
            <Nav variant="tabs" defaultActiveKey="/inspection">
                <Nav.Item>
                    <Nav.Link href="/inspection">Inspection Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/rework">Rework Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/rejection">Rejection Details</Nav.Link>
                </Nav.Item>
            </Nav>
        </Container>
        </div>
    )
}
/*<Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">WINDALS</Navbar.Brand>
                    
                    <Nav className="SubmitReport">
                        <Nav.Link href="#inspection">Inspection Details</Nav.Link>
                        <Nav.Link href="#rework">Rework Details</Nav.Link>
                        <Nav.Link href="#rejection">Rejection Details</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>        */

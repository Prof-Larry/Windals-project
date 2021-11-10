import React from 'react'
import {Navbar,Container,Nav,Button,ButtonGroup} from 'react-bootstrap'
import { Link, } from 'react-router-dom'



export default function SubmitReport() {
    return (
        <div className="SubmitReport">
                <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">WINDALS</Navbar.Brand>
                    
                    <Nav className="SubmitReport">
                        <Nav.Link href="#inspection">Inspection tdsDetails</Nav.Link>
    
                        <Nav.Link href="#rework">Rework Details</Nav.Link>
                        <Nav.Link href="#rejection">Rejection Details</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>        
        </div>
    )
}


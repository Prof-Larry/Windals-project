import React from 'react'
import { Button, Container, Form, Row, Col, Nav } from 'react-bootstrap'
import Navbar from '../Navbar/NavbarAdmin'



export default function InspectionDetails(props) {
    localStorage.setItem('inspection', JSON.stringify(props.inspection));

    const handleChange = (e) => {
        const { name, value } = e.target;
        props.setInspection({ ...props.inspection, [name]: value });
    }

    return (
        <div className="InspectionDetails">
            <Navbar />
            <Container>

                <Nav variant="tabs" defaultActiveKey="/inspection" className="justify-content-md-center">
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
            <br />
            <Container >
                <Form>
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Plant Code</Form.Label>
                        <Col sm="4">
                            <Form.Control name="plant_code" value={props.inspection.plant_code} onChange={handleChange}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Production Line</Form.Label>
                        <Col sm="4">
                            <Form.Control name="production_line" value={props.inspection.production_line} onChange={handleChange}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Product no</Form.Label>
                        <Col sm="4">
                            <Form.Control name="product_number" value={props.inspection.product_number} onChange={handleChange}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Product Name</Form.Label>
                        <Col sm="4">
                            <Form.Control name="product_name" value={props.inspection.product_name} onChange={handleChange}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Row className="justify-content-md-center">
                        <Col sm="4" />
                        <Col sm="3">
                            <Button variant="danger" size="lg" className="justify-content-md-center" onClick={event => window.location.href = '/rejection'}>Save and Next</Button>
                        </Col>
                    </Row><br />
                </Form>
            </Container>

        </div>
    )
}
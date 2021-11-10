import React from 'react'
import { Button, Container, Form,Row,Col} from 'react-bootstrap'



export default function InspectionDetails() {
    return (
        <div className="InspectionDetails">
            <Container>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Date of Inspection</Form.Label>
                            <Col sm="4">
                                <Form.Control type="date" placeholder="dd/mm/yy"></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Plant Code</Form.Label>
                            <Col sm="4">
                                <Form.Control></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Production Line</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Product no</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-5">
                            <Form.Label column sm ="3">Product Name</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Button variant="danger">Save and Next</Button>


                </Form>
            </Container>
            
        </div>
    )
}
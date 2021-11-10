import React from 'react'
import { Button,Container,Row,Col,Form,Nav } from 'react-bootstrap'



export default function RejectionDetails() {
    return (
        <div className="RejectionDetails">
            <Container>
            <Nav variant="tabs" defaultActiveKey="/rejection">
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
            <Container>
                <br/>
                <Form>
                <Form.Text as={Row} className="mb-3" >**Inprocess Rejection**</Form.Text>
                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Name of Process</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">No. of quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">No. of defective quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Location of Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Category of Defect</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Details</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm ="3">Rework</Form.Label>
                        <Col>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Scrap"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Used Under Deviation"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                            </div>
                        ))}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Details:</Form.Label>
                            <Col sm="4">
                                <Form.Control as="textarea" rows={3}></Form.Control>
                            </Col>
                    </Form.Group>
                    <Button variant="danger">Submit</Button>
                </Form>

            </Container>

            
        </div>
    )
}
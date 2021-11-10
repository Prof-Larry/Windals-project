import React from 'react'
import { Button,Container,Row,Col,Form } from 'react-bootstrap'



export default function ReworkDetails() {
    return (
        <div className="ReworkDetails">
            <Container>
                
                <Form>
                    <Form.Text as={Row} className="mb-3" >**Inprocess Rework**</Form.Text>
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
                                    label="Done"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Incomplete"
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

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Who will do Rework:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <Button className="mb-5" variant="success">Add Rework</Button>

                    <Form.Text as={Row} className="mb-3" >**PDI Rework**</Form.Text>
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
                                    label="Done"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Incomplete"
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

                    <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm ="3">Who will do Rework:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <Button className="mb-5" variant="success">Add Rework</Button>
                    <br/>
                    <Button variant="danger">Save and Next</Button>


                </Form>
            </Container>
        </div>
    )
}
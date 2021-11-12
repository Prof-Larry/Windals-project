import React from 'react'
import { Button,Container,Row,Col,Form,Nav } from 'react-bootstrap'
import Navbar from '../Navbar/NavbarAdmin'



export default function ReworkDetails() {
    return (
        <div className="ReworkDetails">
            <Navbar/>
            <Container>
            <Nav variant="tabs" defaultActiveKey="/rework" className="justify-content-md-center">
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
                    <Form.Text as={Row} className="justify-content-md-center" >**Inprocess Rework**</Form.Text>
                    <br/>
                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Name of Process</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">No. of quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">No. of defective quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Location of Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Category of Defect</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Details</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm ="3">Rework</Form.Label>
                        <Col sm="4">
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
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Details:</Form.Label>
                            <Col sm="4">
                                <Form.Control as="textarea" rows={3}></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Who will do Rework:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>
                    
                    <Row className="justify-content-md-center">
                        <Col sm="5"/>
                        <Col sm="2">
                            <Button className="justify-content-md-center" variant="success">Add Rework</Button>
                        </Col>
                    </Row>
                    <br/>

                    <Form.Text as={Row} className="justify-content-md-center" >**PDI Rework**</Form.Text>
                    <br/>
                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Name of Process</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">No. of quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">No. of defective quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Location of Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Category of Defect</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Details</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm ="3">Rework</Form.Label>
                        <Col sm="4">
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
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Details:</Form.Label>
                            <Col sm="4">
                                <Form.Control as="textarea" rows={3}></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Who will do Rework:</Form.Label>
                            <Col sm="4">
                                <Form.Control ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Row className="justify-content-md-center">
                        <Col sm="5"/>
                        <Col sm="2">
                            <Button className="justify-content-md-center" variant="success">Add Rework</Button>
                        </Col>
                    </Row>
                    <br/>

                    <Row className="justify-content-md-center">
                        <Col sm="4"/>
                        <Col sm="3">
                    <Button variant="danger" size="lg" className="justify-content-md-center" onClick={event =>  window.location.href='/rejection'}>Save and Next</Button>
                       </Col>
                    </Row><br/>


                </Form>
            </Container>
        </div>
    )
}
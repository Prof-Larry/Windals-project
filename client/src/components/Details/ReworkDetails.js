import React, { useEffect } from 'react'
import { Button,Container,Row,Col,Form,Nav } from 'react-bootstrap'
import Navbar from '../Navbar/NavbarAdmin'



export default function ReworkDetails(props) {

    const updateInprocessRework = (e) => {
        const { name, value } = e.target;
        props.setInprocessRework({...props.inprocessRework, [name] : value});
        localStorage.setItem('report', JSON.stringify(props.inprocessRework));
    }
    localStorage.setItem('report', JSON.stringify(props.inprocessRework));
    let report = JSON.parse(localStorage.getItem('report'));

    const updateEachDefect = (e) => {
        const {name, value } = e.target;
        props.setInpDefect({...props.inp_defect, [name] : value});
    }

    useEffect(() => {
        report = JSON.parse(localStorage.getItem('report'));
    }, [props.inprocessRework, props.inp_defect]);

    
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
                                <Form.Control name="inprocess_name" value={report.inprocess_name} onChange={updateInprocessRework} ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">No. of quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_total_quantity" value={props.inprocessRework.inprocess_total_quantity} onChange={props.updateInprocessTotalQuantity} ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">No. of defective quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_total_defective_quantity" value={props.inprocessRework.inprocess_total_defective_quantity} readOnly></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_defect" value={props.inp_defect.inprocess_defect} onChange={updateEachDefect}></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">No. of defect specific quantity:</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_defect_quantity" value={props.inp_defect.inprocess_defect_quantity} onChange={props.updateInprocessDefectQantity}></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Location of Defect:</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_defect_location" value={props.inp_defect.inprocess_defect_location} onChange={updateEachDefect} ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Category of Defect</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_category_defect" value={props.inp_defect.inprocess_category_defect} onChange={updateEachDefect} ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Details</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_defect_details" value={props.inp_defect.inprocess_defect_details} onChange={updateEachDefect}></Form.Control>
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
                                    name="inprocess_rework_status"
                                    value="Done"
                                    onChange={updateEachDefect}
                                />
                                <Form.Check
                                    inline
                                    label="Incomplete"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    name="inprocess_rework_status"
                                    value="Incomplete"
                                    onChange={updateEachDefect}
                                />
                            </div>
                        ))}
                        </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Details:</Form.Label>
                            <Col sm="4">
                                <Form.Control as="textarea" rows={3} name="inprocess_rework_details" value={props.inp_defect.inprocess_rework_details} onChange={updateEachDefect}></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>

                    <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm ="3">Who will do Rework:</Form.Label>
                            <Col sm="4">
                                <Form.Control name="inprocess_defect_handler" value={props.inp_defect.inprocess_defect_handler} onChange={updateEachDefect} ></Form.Control>
                            </Col>
                    </Form.Group>
                    <br/>
                    
                    <Row className="justify-content-md-center">
                        <Col sm="5"/>
                        <Col sm="2">
                            <Button className="justify-content-md-center" variant="success" onClick={props.addInpDefects}>Add Rework</Button>
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
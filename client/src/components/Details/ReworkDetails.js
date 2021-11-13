import React, { useEffect } from 'react'
import { Button, Container, Row, Col, Form, Nav, Card } from 'react-bootstrap'
import Navbar from '../Navbar/NavbarAdmin'



export default function ReworkDetails(props) {

    localStorage.setItem('inp_report', JSON.stringify(props.inprocessRework));
    localStorage.setItem('inpro_defect', JSON.stringify(props.inprocess_defects));
    localStorage.setItem('pdi_report', JSON.stringify(props.pdiRework));
    localStorage.setItem('pdi_defect', JSON.stringify(props.pdi_defects));

    const updateInprocessRework = (e) => {
        const { name, value } = e.target;
        props.setInprocessRework({ ...props.inprocessRework, [name]: value });
        localStorage.setItem('inp_report', JSON.stringify(props.inprocessRework));
    }

    // const updateEachDefect = (e) => {
    //     const { name, value } = e.target;
    //     props.setInpDefect({ ...props.inp_defect, [name]: value });
    //     localStorage.setItem('inpro_defect', JSON.stringify(props.inp_defect));
    // }

    const handleRemoveClick = index => {
        const list = [...props.inprocess_defects];
        list.splice(index, 1);
        props.setInprocessDefects(list);
    }

    const handleAddClick = () => {
        props.setInprocessDefects([...props.inprocess_defects, {
            inprocess_defect_quantity: "",
            inprocess_defect: "",
            inprocess_defect_location: "",
            inprocess_category_defect: "",
            inprocess_defect_details: "",
            inprocess_rework_status: "",
            inprocess_rework_details: "",
            inprocess_defect_handler: ""
        }])
    }

    const updatePdiRework = (e) => {
        const { name, value } = e.target;
        props.setPdiRework({ ...props.pdiRework, [name]: value });
        localStorage.setItem('pdi_report', JSON.stringify(props.pdiRework));
    }

    const updateEachDefectPdi = (e) => {
        const { name, value } = e.target;
        props.setPdDefect({ ...props.pd_defect, [name]: value });
        localStorage.setItem('pdi_defect', JSON.stringify(props.pd_defect));
    }

    useEffect(() => {

    }, [props.inprocessRework, props.inp_defect]);


    return (
        <div className="ReworkDetails">
            <Navbar />
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
                <br />

                <Form>
                    <Form.Text as={Row} className="justify-content-md-center" >**Inprocess Rework**</Form.Text>
                    <br />
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Control name="inprocess_name" value={props.inprocessRework.inprocess_name} onChange={updateInprocessRework} ></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">No. of quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="inprocess_total_quantity" value={props.inprocessRework.inprocess_total_quantity} onChange={props.updateInprocessTotalQuantity} ></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">No. of defective quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="inprocess_total_defective_quantity" value={props.inprocessRework.inprocess_total_defective_quantity} readOnly></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    {props.inprocess_defects.map((x, i) => {
                        return (
                            <div className="box">
                                <Row className="justify-content-md-center mt-4">
                                    <Col sm="8">
                                        <Card >
                                            <Card.Header className="text-center">CARD</Card.Header>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">defects:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="defect" value={x.defect}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">No. of defect specific quantity:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="no_of" value={x.no_of}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Location of Defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="location" value={x.location}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-3 mb-1">
                                                <Form.Label column sm="4">category of defects:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="category" value={x.category}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="details" value={x.details}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework:</Form.Label>
                                                <Col sm="6">
                                                    {['radio'].map((type) => (
                                                        <div key={`inline-${type}`} className="mb-3">
                                                            <Form.Check
                                                                inline
                                                                label="Done"
                                                                type={type}
                                                                id={`inline-${type}-1`}
                                                                value={x.rework}
                                                                name="rework"
                                                            />
                                                            <Form.Check
                                                                inline
                                                                label="Incomplete"
                                                                type={type}
                                                                id={`inline-${type}-2`}
                                                                name="rework"

                                                            />

                                                        </div>
                                                    ))

                                                    }
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rework_details" as="textarea" rows={3} value={x.rework_details}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Who will do Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="who" value={x.who}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <div className="mt-1 text-center">
                                                {props.inprocess_defects.length !== 1 && <Button className="mx-1 mt-2 mb-2" variant="danger" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                                {props.inprocess_defects.length - 1 === i && <Button className="mx-1 mt-2 mb-2" variant="success" onClick={handleAddClick}>Add</Button>}
                                            </div>

                                        </Card>
                                    </Col>
                                </Row>
                                <br />
                                <div style={{ marginTop: 20 }}>{JSON.stringify(props.inprocess_defects)}</div>
                            </div>
                        );
                    })}





                    <Form.Text as={Row} className="justify-content-md-center" >**PDI Rework**</Form.Text>
                    <br />
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_name" value={props.pdiRework.pdi_name} onChange={updatePdiRework}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">No. of quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_total_quantity" value={props.pdiRework.pdi_total_quantity} onChange={updatePdiRework}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">No. of defective quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_total_defective_quantity" value={props.pdiRework.pdi_total_defective_quantity} readOnly></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Defect:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_defect" value={props.pd_defect.pdi_defect} onChange={updateEachDefectPdi}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">No. of defect specific quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_defect_quantity" value={props.pd_defect.pdi_defect_quantity} onChange={props.updatePdiDefectQantity}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Location of Defect:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_defect_location" value={props.pd_defect.pdi_defect_location} onChange={updateEachDefectPdi}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Category of Defect</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_category_defect" value={props.pd_defect.pdi_category_defect} onChange={updateEachDefectPdi}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Details</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_details" value={props.pd_defect.pdi_details} onChange={updateEachDefectPdi}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Rework</Form.Label>
                        <Col sm="4">
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Done"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        name="pdi_rework_status"
                                        value="Done"
                                        onChange={updateEachDefectPdi}
                                    />
                                    <Form.Check
                                        inline
                                        label="Incomplete"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        name="pdi_rework_status"
                                        value="Incomplete"
                                        onChange={updateEachDefectPdi}
                                    />
                                </div>
                            ))}
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Details:</Form.Label>
                        <Col sm="4">
                            <Form.Control as="textarea" rows={3} name="pdi_rework_details" value={props.pd_defect.pdi_rework_details} onChange={updateEachDefectPdi}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Who will do Rework:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="pdi_defect_handler" value={props.pd_defect.pdi_defect_handler} onChange={updateEachDefectPdi}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Row className="justify-content-md-center">
                        <Col sm="5" />
                        <Col sm="2">
                            <Button className="justify-content-md-center" variant="success">Add Rework</Button>
                        </Col>
                    </Row>
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
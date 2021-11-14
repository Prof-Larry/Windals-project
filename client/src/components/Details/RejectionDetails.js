import React from 'react'
import { Button, Container, Row, Col, Form, Nav, Card } from 'react-bootstrap'
import Navbar from '../Navbar/NavbarAdmin'



export default function RejectionDetails(props) {

    localStorage.setItem('rej_report', JSON.stringify(props.rejectionRework));
    localStorage.setItem('rej_defect', JSON.stringify(props.rej_defects));

    const handleChange = (e) => {
        const { name, value } = e.target;
        props.setRejectionRework({ ...props.rejectionRework, [name]: value });
    }

    const handleRemoveClick = index => {
        const list = [...props.rej_defects];
        list.splice(index, 1);
        props.setRejDefects(list);
    }

    const handleAddClick = () => {
        props.setRejDefects([...props.rej_defects, {
            rej_defect_quantity: "",
            rej_defect: "",
            rej_defect_location: "",
            rej_category_defect: "",
            rej_defect_details: "",
            rej_rework_status: "",
            rej_rework_details: "",
            rej_defect_handler: ""
        }])
    }

    return (
        <div className="RejectionDetails">
            <Navbar />
            <Container>
                <Nav variant="tabs" defaultActiveKey="/rejection" className="justify-content-md-center">
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
                    <Form.Text as={Row} className="justify-content-md-center" >**Inprocess Rejection**</Form.Text>
                    <br />
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Control name="rejection_name" value={props.rejectionRework.rejection_name} onChange={handleChange}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">No. of quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="rejection_total_quantity" value={props.rejectionRework.rejection_total_quantity} onChange={handleChange}></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">No. of defective quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control name="rejection_total_defective_quantity" value={props.rejectionRework.rejection_total_defective_quantity} readOnly></Form.Control>
                        </Col>
                    </Form.Group>
                    <br />

                    {props.rej_defects.map((x, i) => {
                        return (
                            <div className="box">
                                <Row className="justify-content-md-center mt-4">
                                    <Col sm="8">
                                        <Card >
                                            <Card.Header className="text-center">CARD</Card.Header>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rej_defect" value={x.rej_defect}
                                                        onChange={e => props.addRejDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">No. of defect specific quantity:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rej_defect_quantity" value={x.rej_defect_quantity}
                                                        onChange={e => props.addRejDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Location of Defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rej_defect_location" value={x.rej_defect_location}
                                                        onChange={e => props.addRejDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-3 mb-1">
                                                <Form.Label column sm="4">category of defects:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rej_category_defect" value={x.rej_category_defect}
                                                        onChange={e => props.addRejDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rej_defect_details" value={x.rej_defect_details}
                                                        onChange={e => props.addRejDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Check type="radio" name="rej_rework_status" label="Scrap" value="scrap"
                                                        onChange={e => props.addRejDefects(e, i)}                                                            />
                                                    <Form.Check type="radio" name="rej_rework_status" label="Used Under Deviation" value="used under deviation" 
                                                        onChange={e => props.addRejDefects(e, i)}                                                            />                                                    
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rej_rework_details" as="textarea" rows={3} value={x.rej_rework_details}
                                                        onChange={e => props.addRejDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Who will do Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control name="rej_defect_handler" value={x.rej_defect_handler}
                                                        onChange={e => props.addRejDefects(e, i)}></Form.Control></Col>
                                            </Row>

                                            <div className="mt-1 text-center">
                                                {props.rej_defects.length !== 1 && <Button className="mx-1 mt-2 mb-2" variant="danger" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                                {props.rej_defects.length - 1 === i && <Button className="mx-1 mt-2 mb-2" variant="success" onClick={handleAddClick}>Add</Button>}
                                            </div>

                                        </Card>
                                    </Col>
                                </Row>
                                <br />
                                <div style={{ marginTop: 20 }}>{JSON.stringify(props.rej_defects)}</div>

                            </div>
                        );
                    })}
                    <Row className="justify-content-md-center">
                        <Col sm="5"></Col>
                        <Col sm="2">
                            <Button variant="danger">Submit</Button>
                        </Col>
                    </Row>
                </Form>

            </Container>


        </div>
    )
}
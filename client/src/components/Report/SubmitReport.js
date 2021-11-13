import React, { useState } from 'react'
import { Navbar, Container, Nav, Button, ButtonGroup, Form, Card, Row, Col } from 'react-bootstrap'
import { Link, } from 'react-router-dom'



export default function SubmitReport() {

    const [inputList, setInputList] = useState([{ defect: "", no_of: "", location: "", category: "", details: "", rework: "", rework_details: "", who: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { defect: "", no_of: "", location: "", category: "", details: "", rework: "", rework_details: "", who: "" }]);
    };

    return (
        <div className="App">
            {inputList.map((x, i) => {
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
                                                onChange={e => handleInputChange(e, i)}></Form.Control></Col>
                                    </Row>

                                    <Row className="justify-content-md-center mt-4">
                                        <Form.Label column sm="4">No. of defect specific quantity:</Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="no_of" value={x.no_of}
                                                onChange={e => handleInputChange(e, i)}></Form.Control></Col>
                                    </Row>

                                    <Row className="justify-content-md-center mt-4">
                                        <Form.Label column sm="4">Location of Defect:</Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="location" value={x.location}
                                                onChange={e => handleInputChange(e, i)}></Form.Control></Col>
                                    </Row>

                                    <Row className="justify-content-md-center mt-3 mb-1">
                                        <Form.Label column sm="4">category of defects:</Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="category" value={x.category}
                                                onChange={e => handleInputChange(e, i)}></Form.Control></Col>
                                    </Row>

                                    <Row className="justify-content-md-center mt-4">
                                        <Form.Label column sm="4">Details:</Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="details" value={x.details}
                                                onChange={e => handleInputChange(e, i)}></Form.Control></Col>
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
                                                onChange={e => handleInputChange(e, i)}></Form.Control></Col>
                                    </Row>

                                    <Row className="justify-content-md-center mt-4">
                                        <Form.Label column sm="4">Who will do Rework:</Form.Label>
                                        <Col sm="6">
                                            <Form.Control name="who" value={x.who}
                                                onChange={e => handleInputChange(e, i)}></Form.Control></Col>
                                    </Row>

                                    <div className="mt-1 text-center">
                                        {inputList.length !== 1 && <Button className="mx-1 mt-2 mb-2" variant="danger" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                        {inputList.length - 1 === i && <Button className="mx-1 mt-2 mb-2" variant="success" onClick={handleAddClick}>Add</Button>}
                                    </div>

                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
                    </div>
                );
            })}
        </div>
    );
}
/*
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
                    <br />


style={{ width: '50rem' }}

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Details</Form.Label>
                        <Col sm="4">
                            <Form.Control ></Form.Control>
                        </Col>
                    </Form.Group>




<Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">WINDALS</Navbar.Brand>

                    <Nav className="SubmitReport">
                        <Nav.Link href="#inspection">Inspection Details</Nav.Link>
                        <Nav.Link href="#rework">Rework Details</Nav.Link>
                        <Nav.Link href="#rejection">Rejection Details</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>        */

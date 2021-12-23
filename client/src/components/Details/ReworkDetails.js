import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Form, Nav, Card } from 'react-bootstrap'
import Navbar from '../Navbar/NavbarAdmin'
import { useHistory } from 'react-router';


export default function ReworkDetails(props) {

    const history = useHistory();

    const checkAuthorization = async () => {
        try {
            const response = await fetch('http://localhost:5050/report/reportAuthorization', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);
            if (response.status !== 200) {
                throw new Error(response.error);
            }
        } catch (error) {
            console.log(error);
            history.push('/adminlogin');
        }
    }

    useEffect(() => {
        checkAuthorization();
    }, []);

    const [validated, setValidated] = useState(false);

    const handleValidate = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };






    localStorage.setItem('inp_report', JSON.stringify(props.inprocessRework));
    localStorage.setItem('inpro_defect', JSON.stringify(props.inprocess_defects));
    localStorage.setItem('pdi_report', JSON.stringify(props.pdiRework));
    localStorage.setItem('pdi_defect', JSON.stringify(props.pdi_defects));

    const updateInprocessRework = (e) => {
        const { name, value } = e.target;
        props.setInprocessRework({ ...props.inprocessRework, [name]: value });
         localStorage.setItem('inp_report', JSON.stringify(props.inprocessRework));
        console.log(props.inprocessRework)
    }

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
            inprocess_rework_handler: ""
        }])
    }

    const handleRemoveClickPdi = index => {
        const list = [...props.pdi_defects];
        list.splice(index, 1);
        props.setPdiDefects(list);
    }

    const handleAddClickPdi = () => {
        props.setPdiDefects([...props.pdi_defects, {
            pdi_defect_quantity: "",
            pdi_defect: "",
            pdi_defect_location: "",
            pdi_category_defect: "",
            pdi_defect_details: "",
            pdi_rework_status: "",
            pdi_rework_details: "",
            pdi_rework_handler: ""
        }]);
    }

    const updatePdiRework = (e) => {
        const { name, value } = e.target;
        props.setPdiRework({ ...props.pdiRework, [name]: value });
    }


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

                <Form noValidate validated={validated} onSubmit={handleValidate}>
                    <strong><Form.Text as={Row} className="justify-content-md-center text-dark" >** Rework **</Form.Text></strong>
                    <br />
                    <Form.Group as={Row} className="justify-content-md-center mb-4">
                        <Form.Label column sm="3" className="text-dark">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Select 
                                name="rework_type"
                                onChange={updateInprocessRework}
                                >
                                <option value="">select rework type</option>
                                <option value="inprocess">Inprocess</option>
                                <option value="pdi">PDI</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="justify-content-md-center mb-4">
                        <Form.Label column sm="3" className="text-dark">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Select 
                                name="inprocess_name"
                                onChange={updateInprocessRework}
                                >
                                <option>select name of process</option>
                                <option value="process 1">process 1</option>
                                <option value="process 2">process 2</option>
                                <option value="process 3">process 3</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    {/*<Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3" className="text-dark">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="inprocess_name" value={props.inprocessRework.inprocess_name} onChange={updateInprocessRework} ></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide Name of Process.</Form.Control.Feedback>
                        </Col>
    </Form.Group>*/}
                   

                    <Form.Group as={Row} className="justify-content-md-center mb-4">
                        <Form.Label column sm="3" className="text-dark">No. of quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="inprocess_total_quantity" value={props.inprocessRework.inprocess_total_quantity} onChange={updateInprocessRework} ></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide No. of quantity.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                 

                    {props.inprocess_defects.map((x, i) => {
                        return (
                            <div className="box">
                                <Row className="justify-content-md-center mt-4">
                                    <Col sm="8">
                                        <Card >
                                            <Card.Header className="text-center text-dark">DEFECT LIST</Card.Header>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Select 
                                                    required 
                                                    name="inprocess_defect"
                                                    onChange={e => props.addInpDefects(e, i)}
                                                    >
                                                        <option value="">select name of defect</option>
                                                        <option value="option_1">option_1</option>
                                                        <option value="option_2">option_2</option>
                                                        <option value="option_3">option_3</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">Please provide defect.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">No. of defect specific quantity:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_defect_quantity" value={x.inprocess_defect_quantity}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide No. of defect specific quantity.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Location of Defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Select
                                                    required 
                                                    name="inprocess_defect_location"
                                                    onChange={e => props.addInpDefects(e, i)}
                                                    >
                                                        <option value="">select Location of defect</option>
                                                        <option value="option_1">option_1</option>
                                                        <option value="option_2">option_2</option>
                                                        <option value="option_3">option_3</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">Please provide Location of Defect.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-3 mb-1">
                                                <Form.Label column sm="4" className="text-dark">category of defects:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Select 
                                                    required 
                                                    name="inprocess_category_defect"
                                                    onChange={e => props.addInpDefects(e, i)}
                                                    >
                                                        <option value="">select Category of defect</option>
                                                        <option value="option_1">option_1</option>
                                                        <option value="option_2">option_2</option>
                                                        <option value="option_3">option_3</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">Please provide category of defects.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control 
                                                    required 
                                                    name="inprocess_defect_details" 
                                                    as="textarea" rows={3}
                                                    value={x.inprocess_defect_details}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide details.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                           
                        <br/>
                        <Form.Group as={Row} className="justify-content-md-center">
                            <Form.Label column sm="4" className="text-dark">Rework Status:</Form.Label>
                            <Col sm="6">
                                <Form.Select 
                                name="inprocess_rework_status"
                                onChange={e => props.addInpDefects(e, i)}
                                >
                                <option>select Rework Status</option>
                                <option value="done">Done</option>
                                <option value="incomplete">Incomplete</option>
                                </Form.Select>
                            </Col>
                            </Form.Group>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Rework Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_rework_details" as="textarea" rows={3} value={x.inprocess_rework_details}
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Rework Details</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Who will do Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_rework_handler" value={x.inprocess_rework_handler}
                                                        placeholder="provide employee ID"
                                                        onChange={e => props.addInpDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Who will do Rework.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <div className="mt-1 text-center">
                                                {props.inprocess_defects.length !== 1 && <Button className="mx-1 mt-2 mb-2" variant="danger" onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                                {props.inprocess_defects.length - 1 === i && <Button className="mx-1 mt-2 mb-2" variant="success" onClick={handleAddClick}>Add</Button>}
                                            </div>

                                        </Card>
                                    </Col>
                                </Row>
                                <br />

                            </div>
                        );
                    })}





                    {/*<strong><Form.Text as={Row} className="justify-content-md-center text-dark" >**PDI Rework**</Form.Text></strong>
                    <br />
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3" className="text-dark">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="pdi_name" value={props.pdiRework.pdi_name} onChange={updatePdiRework}></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide Name of Process</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3" className="text-dark">No. of quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="pdi_total_quantity" value={props.pdiRework.pdi_total_quantity} onChange={updatePdiRework}></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide No. of quantity</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    {props.pdi_defects.map((x, i) => {
                        return (
                            <div className="box">
                                <Row className="justify-content-md-center mt-4">
                                    <Col sm="8">
                                        <Card >
                                            <Card.Header className="text-center text-dark">DEFECT LIST</Card.Header>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_defect" value={x.pdi_defect}
                                                        onChange={e => props.addPdiDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide defects</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">No. of defect specific quantity:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_defect_quantity" value={x.pdi_defect_quantity}
                                                        onChange={e => props.addPdiDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide No. of defect specific quantity</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Location of Defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_defect_location" value={x.pdi_defect_location}
                                                        onChange={e => props.addPdiDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Location of Defect</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-3 mb-1">
                                                <Form.Label column sm="4" className="text-dark">category of defects:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_category_defect" value={x.pdi_category_defect}
                                                        onChange={e => props.addPdiDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide category of defects</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_defect_details" value={x.pdi_defect_details}
                                                        onChange={e => props.addPdiDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Details</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Rework Status:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Check type="radio" name="pdi_rework_status" label="done" value="done"
                                                        onChange={e => props.addPdiDefects(e, i)} />
                                                    <Form.Check type="radio" name="pdi_rework_status" label="incomplete" value="incomplete"
                                                        onChange={e => props.addPdiDefects(e, i)} />
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Rework Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_rework_details" as="textarea" rows={3} value={x.pdi_rework_details}
                                                        onChange={e => props.addPdiDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Rework Details</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4" className="text-dark">Who will do Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_rework_handler" value={x.pdi_rework_handler}
                                                        placeholder="provide employee ID"
                                                        onChange={e => props.addPdiDefects(e, i)}></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Who will do Rework</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <div className="mt-1 text-center">
                                                {props.pdi_defects.length !== 1 && <Button className="mx-1 mt-2 mb-2" variant="danger" onClick={() => handleRemoveClickPdi(i)}>Remove</Button>}
                                                {props.pdi_defects.length - 1 === i && <Button className="mx-1 mt-2 mb-2" variant="success" onClick={handleAddClickPdi}>Add</Button>}
                                            </div>

                                        </Card>
                                    </Col>
                                </Row>
                                <br />
                            </div>
                        );
                    })}*/}

                    <Row className="justify-content-md-end">
                        <Col sm="7">
                            <Button type="submit" variant="success" size="lg" className="mx-2" >SUBMIT</Button>
                            <Button variant="danger" size="lg" className="mx-2" onClick={event => window.location.href = '/rejection'}>NEXT</Button>
                        </Col>
                    </Row><br />


                </Form>
            </Container>
        </div>
    )
}

/*
onClick={event => window.location.href = '/rejection'}
*/
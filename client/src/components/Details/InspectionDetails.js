import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Row, Col, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Navbar from '../Navbar/NavbarAdmin'
import axios from 'axios'



export default function InspectionDetails(props) {
    const history = useHistory();

    const [plant_codes, setPlantCodes] = useState([]);
    const [productionLine, setProductionLine] = useState([]);
    const [process, setProcess] = useState([]);
    const [product, setProduct] = useState([]);

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

    const getPlantCode = async () => {
        try {
            const response = await fetch("http://localhost:5050/report/plantcodes", {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            setPlantCodes(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getInspectionDropDown = (e) => {
        const { name, value } = e.target;
        axios
            .post("http://localhost:5050/report/inspectionDropDown", { [name]: value }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "JWT fefege...",
                },
                withCredentials: true,
            })
            .then((res) => {
                setProductionLine(res.data[0].production_line);
                setProcess(res.data[0].process);
                setProduct(res.data[0].product);
                console.log(res.data[0]);
            })
            .catch((e) => {
                alert("Some technical Error, please try again later");
            });
    }

    useEffect(() => {
        checkAuthorization();
        getPlantCode();
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
                <Form noValidate validated={validated} onSubmit={handleValidate}>

                    <Form.Group as={Row} className="justify-content-md-center mb-4">
                        <Form.Label column sm="3" className="text-dark">Plant Code</Form.Label>
                        <Col sm="4">
                            <Form.Select
                                required
                                name="plant_code"
                                onChange={getInspectionDropDown}
                            >
                                <option value="">select plant code</option>
                                {/* <option value="wppl0001">wppl0001</option>
                                <option value="wppl0002">wppl0002</option>
                                <option value="wppl0003">wppl0003</option>
                                <option value="wppl0004">wppl0004</option>
                                <option value="wppl0005">wppl0005</option> */}
                                {plant_codes.map((pcode, index) => {
                                    return (
                                        <option key={index} value={pcode}>{pcode}</option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please provide plant code.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>



                    <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom02">
                        <Form.Label column sm="3" className="text-dark">Production Line</Form.Label>
                        <Col sm="4">
                            <Form.Select
                                required
                                name="production_line"
                            >
                                <option value="None">Select Production Line</option>
                                {productionLine.map((l, i) => {
                                    return (
                                        <option key={i} value={l.line}>{l.line}</option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please provide production line.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom03">
                        <Form.Label column sm="3" className="text-dark">Product no</Form.Label>
                        <Col sm="4">
                            <Form.Select
                                required
                                name="product_number"
                                onChange={handleChange}
                            >
                                <option value="">Select Product No.</option>
                                {process.map((p, i) => {
                                    return (
                                        <option key={i} value={p.process_name}>{p.process_name}</option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please provide product no.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom04">
                        <Form.Label column sm="3" className="text-dark">Product Name</Form.Label>
                        <Col sm="4">
                            <Form.Select
                                required
                                name="product_name"
                                onChange={handleChange}
                            >
                                <option value="">Select Product Name</option>
                                {product.map((p, i) => {
                                    return (
                                        <option key={i} value={p.product_name}>{p.product_name}</option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please provide product name.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Row className="justify-content-md-end">
                        <Col sm="7">
                            <Button type="submit" variant="success" size="lg" className="mx-2" >SAVE</Button>
                            <Button variant="danger" size="lg" className="mx-2" onClick={event => window.location.href = '/rework'}>NEXT</Button>
                        </Col>
                    </Row><br />
                </Form>
            </Container>

        </div >
    )
}
/*

onClick={event => window.location.href = '/rejection'}

*/
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Row, Col, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Navbar from '../Navbar/NavbarAdmin'



export default function InspectionDetails(props) {
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
                            onChange={handleChange}
                            >
                            <option value="">select plant code</option>
                            <option value="wppl0001">wppl0001</option>
                            <option value="wppl0002">wppl0002</option>
                            <option value="wppl0003">wppl0003</option>
                            <option value="wppl0004">wppl0004</option>
                            <option value="wppl0005">wppl0005</option>
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
                             onChange={handleChange}
                             >
                            <option value="">Select Production Line</option>
                            <option value="wppl0001">wppl0001</option>
                            <option value="wppl0002">wppl0002</option>
                            <option value="wppl0003">wppl0003</option>
                            <option value="wppl0004">wppl0004</option>
                            <option value="wppl0005">wppl0005</option>
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
                            <option value="001">001</option>
                            <option value="002">002</option>
                            <option value="003">003</option>
                            <option value="004">004</option>
                            <option value="005">005</option>
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
                            <option value="Product_001">Product_001</option>
                            <option value="Product_002">Product_002</option>
                            <option value="Product_003">Product_003</option>
                            <option value="Product_004">Product_004</option>
                            <option value="Product_005">Product_005</option>
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

        </div>
    )
}
/*

onClick={event => window.location.href = '/rejection'}

*/
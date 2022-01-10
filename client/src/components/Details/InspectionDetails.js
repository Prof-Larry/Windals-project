import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Row, Col, Nav } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Navbar from '../Navbar/NavbarAdmin'
import axios from 'axios'



export default function InspectionDetails(props) {
    const history = useHistory();

    const getProductionLine = () => {
        const production_line = JSON.parse(sessionStorage.getItem("production_line"));
        if (production_line) {
            return production_line;
        }
        return [];
    }

    const getProductInfo = () => {
        const product_info = JSON.parse(sessionStorage.getItem('product_info'));
        if (product_info) {
            return product_info;
        }
        return [];
    }

    const [inspectionDetails, setInspectionDetails] = useState({
        plant_code: "", production_line: "", product_number: "", product_name: ""
    });
    const [plant_codes, setPlantCodes] = useState([]);
    const [productionLine, setProductionLine] = useState(getProductionLine());
    const [productIndex, setProductIndex] = useState(-1);
    const [product, setProduct] = useState(getProductInfo());

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
        props.setInspection({ ...props.inspection, [name]: value });
        axios
            .post("http://localhost:5050/report/inspectionDropDown", { [name]: value }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "JWT fefege...",
                },
                withCredentials: true,
            })
            .then((res) => {
                const production_line = res.data[0].production_line.map(l => l.line);
                const product_info = res.data[0].product.map(p => {
                    return {
                        product_number: p.product_number,
                        product_name: p.product_name
                    }
                });
                setProductionLine(production_line);
                sessionStorage.setItem('production_line', JSON.stringify(production_line));
                setProduct(product_info);
                sessionStorage.setItem('product_info', JSON.stringify(product_info));
                console.log(res.data[0]);
            })
            .catch((e) => {
                alert("Some technical Error, please try again later");
            });
    }

    const handleProductChange = (e) => {
        const { value } = e.target;
        const index = product.map((p, i) => {
            return p.product_number == value ? 1 : -1;
        });
        setProductIndex(index.indexOf(1));
        props.setInspection({ ...props.inspection, ["product_number"]: value, ["product_name"]: product[index.indexOf(1)].product_name });
    }

    const handleLineChange = (e) => {
        const { name, value } = e.target;
        props.setInspection({ ...props.inspection, [name]: value });
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




    sessionStorage.setItem('inspection', JSON.stringify(props.inspection));

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
                                {plant_codes.map((pcode, index) => {
                                    return (
                                        <option key={index} value={pcode} selected={props.inspection.plant_code == pcode}>{pcode || props.inspection.plant_code}</option>
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
                                onChange={handleLineChange}
                            >
                                <option value="">Select Production Line</option>
                                {productionLine.map((l, i) => {
                                    return (
                                        <option key={i} value={l} selected={props.inspection.production_line == l}>{l || props.inspection.production_line}</option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please provide production line.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Form.Group as={Row} className="justify-content-md-center" controlId="validationCustom03">
                        <Form.Label column sm="3" className="text-dark">Product number</Form.Label>
                        <Col sm="4">
                            <Form.Select
                                required
                                name="product_number"
                                onChange={handleProductChange}
                            >
                                <option value="">Select Product number</option>
                                {product.map((p, i) => {
                                    return (
                                        <option key={i} value={p.product_number} selected={props.inspection.product_number == p.product_number}>{p.product_number || props.inspection.product_number}</option>
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
                                disabled
                            >
                                <option value="">Product Name</option>
                                {product.map((p, i) => {
                                    return (
                                        <option key={i} value={p.product_name} selected={i == productIndex || props.inspection.product_name == p.product_name}>{p.product_name || props.inspection.product_name}</option>
                                    );
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please provide product name.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <br />

                    <Row className="justify-content-md-end">
                        <Col sm="7">
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
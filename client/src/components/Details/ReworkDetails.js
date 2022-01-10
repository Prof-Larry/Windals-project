import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Nav, Card } from "react-bootstrap";
import Navbar from "../Navbar/NavbarAdmin";
import { useHistory } from "react-router";
import axios from "axios";

export default function ReworkDetails(props) {
  const getCatandDef = () => {
    const catAndDef = JSON.parse(sessionStorage.getItem("catAndDef"));
    if (catAndDef) {
      return catAndDef;
    }
    return {};
  };

  const getCategories = () => {
    const categories = JSON.parse(sessionStorage.getItem("categories"));
    if (categories) {
      return categories;
    }
    return [];
  };

  const history = useHistory();
  const [processes, setProcesses] = useState([]);
  const [catAndDef, setCatandDef] = useState(getCatandDef());
  const [categories, setCategories] = useState(getCategories());

  const checkAuthorization = async () => {
    try {
      const response = await fetch(
        "http://localhost:5050/report/reportAuthorization",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      history.push("/adminlogin");
    }
  };

  const getProcesses = () => {
    axios
      .post(
        "http://localhost:5050/report/inspectionDropDown",
        {
          plant_code: JSON.parse(sessionStorage.getItem("inspection"))
            .plant_code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT fefege...",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setProcesses(res.data[0].process.map((p) => p.process_name));
        console.log(res.data[0]);
      })
      .catch((e) => {
        alert("Some technical Error, please try again later");
      });
  };

  useEffect(() => {
    checkAuthorization();
    getProcesses();
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

  sessionStorage.setItem("rework_details", JSON.stringify(props.reworkDetails));
  sessionStorage.setItem("rework_defects", JSON.stringify(props.reworkDefects));

  const updateReworkDetails = (e) => {
    const { name, value } = e.target;
    if (name == "process_name") {
      axios
        .post(
          "http://localhost:5050/report/categoryDropDown",
          { process: value },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "JWT fefege...",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          const categories_arr = res.data[0].process_categories.map(
            (c) => c.category_name
          );
          console.log(categories_arr);
          setCategories(categories_arr);
          sessionStorage.setItem("categories", JSON.stringify(categories_arr));
        })
        .catch((e) => {
          alert("Some technical Error, please try again later");
        });
    }
    props.setReworkDetails({ ...props.reworkDetails, [name]: value });
    sessionStorage.setItem(
      "rework_details",
      JSON.stringify(props.reworkDetails)
    );
    console.log(props.reworkDetails);
  };

  const handleRemoveClick = (index) => {
    const list = [...props.reworkDefects];
    list.splice(index, 1);
    props.setReworkDefects(list);
  };

  const handleAddClick = () => {
    props.setReworkDefects([
      ...props.reworkDefects,
      {
        rework_defect_quantity: "",
        rework_defect: "",
        rework_defect_location: "",
        rework_category_defect: "",
        rework_defect_details: "",
        rework_rework_status: "",
        rework_rework_details: "",
        rework_rework_handler: "",
      },
    ]);
  };

  return (
    <div className="ReworkDetails">
      <Navbar />
      <Container>
        <Nav
          variant="tabs"
          defaultActiveKey="/rework"
          className="justify-content-md-center"
        >
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
          <strong>
            <Form.Text as={Row} className="justify-content-md-center text-dark">
              ** Rework **
            </Form.Text>
          </strong>
          <br />
          <Form.Group as={Row} className="justify-content-md-center mb-4">
            <Form.Label column sm="3" className="text-dark">
              Type of Process
            </Form.Label>
            <Col sm="4">
              <Form.Select name="rework_type" onChange={updateReworkDetails}>
                <option value="">select rework type</option>
                <option
                  value="inprocess"
                  selected={props.reworkDetails.rework_type == "inprocess"}
                >
                  Inprocess
                </option>
                <option
                  value="pdi"
                  selected={props.reworkDetails.rework_type == "pdi"}
                >
                  PDI
                </option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mb-4">
            <Form.Label column sm="3" className="text-dark">
              Name of Process
            </Form.Label>
            <Col sm="4">
              <Form.Select name="process_name" onChange={updateReworkDetails}>
                <option>select name of process</option>
                {processes.map((p) => {
                  return (
                    <option
                      value={p}
                      selected={props.reworkDetails.process_name == p}
                    >
                      {p}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mb-4">
            <Form.Label column sm="3" className="text-dark">
              No. of Inspected quantity:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="process_quantity"
                value={props.reworkDetails.process_quantity}
                onChange={updateReworkDetails}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide No. of quantity.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {props.reworkDefects.map((x, i) => {
            return (
              <div className="box">
                <Row className="justify-content-md-center mt-4">
                  <Col sm="8">
                    <Card>
                      <Card.Header className="text-center text-dark">
                        DEFECT LIST
                      </Card.Header>

                      <Row className="justify-content-md-center mt-3 mb-1">
                        <Form.Label column sm="4" className="text-dark">
                          Category of Defects:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Select
                            required
                            name="rework_category_defect"
                            onChange={(e) => props.addReworkDefects(e, i)}
                          >
                            <option value="">select Category of defect</option>
                            {categories.map((cat) => {
                              return (
                                <option
                                  value={cat}
                                  selected={x.rework_category_defect == cat}
                                >
                                  {cat}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please provide category of defects.
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Defect:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Select
                            required
                            name="rework_defect"
                            onChange={(e) => props.addReworkDefects(e, i)}
                          >
                            <option value="">
                              {x.rework_defect || "select name of defect"}
                            </option>
                            {props.defects.map((defect) => {
                              return (
                                <option
                                  value={defect}
                                  selected={x.rework_defect == defect}
                                >
                                  {defect || x.rework_defect}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please provide defect.
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          No. of defect specific quantity:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rework_defect_quantity"
                            value={x.rework_defect_quantity}
                            onChange={(e) => props.addReworkDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide No. of defect specific quantity.
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Location of Defect:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Select
                            required
                            name="rework_defect_location"
                            onChange={(e) => props.addReworkDefects(e, i)}
                          >
                            <option value="">select Location of defect</option>
                            {props.location.map((l) => {
                              return (
                                <option
                                  value={l}
                                  selected={x.rework_defect_location == l}
                                >
                                  {l || x.rework_defect_location}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please provide Location of Defect.
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Details:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rework_defect_details"
                            as="textarea"
                            rows={3}
                            value={x.rework_defect_details}
                            onChange={(e) => props.addReworkDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide details.
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <br />
                      <Form.Group
                        as={Row}
                        className="justify-content-md-center"
                      >
                        <Form.Label column sm="4" className="text-dark">
                          Rework Status:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Select
                            name="rework_rework_status"
                            onChange={(e) => props.addReworkDefects(e, i)}
                          >
                            <option>select Rework Status</option>
                            <option
                              value="done"
                              selected={x.rework_rework_status == "done"}
                            >
                              Done
                            </option>
                            <option
                              value="incomplete"
                              selected={x.rework_rework_status == "incomplete"}
                            >
                              Incomplete
                            </option>
                          </Form.Select>
                        </Col>
                      </Form.Group>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Rework Details:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rework_rework_details"
                            as="textarea"
                            rows={3}
                            value={x.rework_rework_details}
                            onChange={(e) => props.addReworkDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Rework Details
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Who will do Rework:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rework_rework_handler"
                            value={x.rework_rework_handler}
                            placeholder="provide employee ID"
                            onChange={(e) => props.addReworkDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Who will do Rework.
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <div className="mt-1 text-center">
                        {props.reworkDefects.length !== 1 && (
                          <Button
                            className="mx-1 mt-2 mb-2"
                            variant="danger"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </Button>
                        )}
                        {props.reworkDefects.length - 1 === i && (
                          <Button
                            className="mx-1 mt-2 mb-2"
                            variant="success"
                            onClick={handleAddClick}
                          >
                            Add
                          </Button>
                        )}
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
              <Button
                type="submit"
                variant="success"
                size="lg"
                className="mx-2"
              >
                SUBMIT
              </Button>
              <Button
                variant="danger"
                size="lg"
                className="mx-2"
                onClick={(event) => (window.location.href = "/rejection")}
              >
                NEXT
              </Button>
            </Col>
          </Row>
          <br />
        </Form>
      </Container>
    </div>
  );
}

/*
onClick={event => window.location.href = '/rejection'}
*/

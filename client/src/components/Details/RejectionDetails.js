import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Nav,
  Card,
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router";
import Navbar from "../Navbar/NavbarAdmin";

export default function RejectionDetails(props) {
  const getCategoriesRejection = () => {
    const categories = JSON.parse(
      sessionStorage.getItem("categories_rejection")
    );
    if (categories) {
      return categories;
    }
    return [];
  };
  const history = useHistory();
  // const [show, setShow] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [categoriesRejection, setCategoriesRejection] = useState(
    getCategoriesRejection()
  );

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
      console.log(data);
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

  sessionStorage.setItem(
    "rejection_details",
    JSON.stringify(props.rejectionRework)
  );
  sessionStorage.setItem(
    "rejection_defects",
    JSON.stringify(props.rejectionDefects)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "rejection_name") {
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
          setCategoriesRejection(categories_arr);
          sessionStorage.setItem(
            "categories_rejection",
            JSON.stringify(categories_arr)
          );
        })
        .catch((e) => {
          alert("Some technical Error, please try again later");
        });
    }
    props.setRejectionRework({ ...props.rejectionRework, [name]: value });
  };

  const handleRemoveClick = (index) => {
    const list = [...props.rejectionDefects];
    list.splice(index, 1);
    props.setRejDefects(list);
  };

  const handleAddClick = () => {
    props.setRejectionDefects([
      ...props.rejectionDefects,
      {
        rejection_defect_quantity: "",
        rejection_defect: "",
        rejection_defect_location: "",
        rejection_category_defect: "",
        rejection_defect_details: "",
        rejection_rework_status: "",
        rejection_rework_details: "",
        rejection_rework_handler: "",
      },
    ]);
  };

  const handleSubmit = () => {
    const inspection = JSON.parse(sessionStorage.getItem("inspection"));
    const rework_details = JSON.parse(sessionStorage.getItem("rework_details"));
    const rejection_details = JSON.parse(
      sessionStorage.getItem("rejection_details")
    );
    const rework_defects = JSON.parse(sessionStorage.getItem("rework_defects"));
    const rejection_defects = JSON.parse(
      sessionStorage.getItem("rejection_defects")
    );
    const report = {
      inspection,
      rework_details,
      rejection_details,
      rework_defects,
      rejection_defects,
    };

    console.log(report);

    axios
      .post("http://localhost:5050/report/submitReport", report, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT fefege...",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 401) {
          throw new Error();
        }
        alert(res.data.message);
        // history.push('/inspection');
      })
      .catch((e) => {
        alert("Some technical Error, please try again later");
      });
  };

  // const handleShow = () => {
  //   setShow(true);
  // };

  // const handleClose = () => {
  //   setShow(false);
  // };

  return (
    <div className="RejectionDetails">
      <Navbar />
      <Container>
        <Nav
          variant="tabs"
          defaultActiveKey="/rejection"
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
        <Form
          noValidate
          validated={validated}
          onSubmit={handleValidate}
          className="text-dark"
        >
          <strong>
            <Form.Text as={Row} className="justify-content-md-center text-dark">
              ** Rejection **
            </Form.Text>
          </strong>
          <br />
          <Form.Group as={Row} className="justify-content-md-center">
            <Form.Label column sm="3" className="text-dark">
              Name of Process
            </Form.Label>
            <Col sm="4">
              <Form.Select
                required
                name="rejection_name"
                value={props.rejectionRework.rejection_name}
                onChange={handleChange}
              >
                <option value="">select Name of Process</option>
                {processes.map((p) => {
                  return <option value={p}>{p}</option>;
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide Name of Process
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <br />

          <Form.Group as={Row} className="justify-content-md-center">
            <Form.Label column sm="3" className="text-dark">
              No. of Rejected quantity:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="rejection_quantity"
                value={props.rejectionRework.rejection_quantity}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide No. of quantity
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <br />

          {props.rejectionDefects.map((x, i) => {
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
                            name="rejection_category_defect"
                            onChange={(e) => props.addRejDefects(e, i)}
                          >
                            <option value="">select Category of defect</option>
                            {categoriesRejection.map((cat) => {
                              return (
                                <option
                                  value={cat}
                                  selected={x.rejection_category_defect == cat}
                                >
                                  {cat}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please provide category of defects
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
                            name="rejection_defect"
                            onChange={(e) => props.addRejDefects(e, i)}
                          >
                            <option value="">select Name of defect</option>
                            {props.rejDefects.map((defect) => {
                              return (
                                <option
                                  value={defect}
                                  selected={x.rejection_defect == defect}
                                >
                                  {defect || x.rejection_defect}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please provide defect
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
                            name="rejection_defect_quantity"
                            value={x.rejection_defect_quantity}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide No. of defect specific quantity
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
                            name="rejection_defect_location"
                            onChange={(e) => props.addRejDefects(e, i)}
                          >
                            <option value="">select Location of defect</option>
                            {props.rejlocation.map((l) => {
                              return (
                                <option
                                  value={l}
                                  selected={x.rejection_defect_location == l}
                                >
                                  {l || x.rejection_defect_location}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please provide Location of Defect
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
                            name="rejection_defect_details"
                            as="textarea"
                            rows={3}
                            value={x.rejection_defect_details}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Details
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Rejection Status:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Select
                            required
                            name="rejection_rework_status"
                            onChange={(e) => props.addRejDefects(e, i)}
                          >
                            <option value="">select Rejection Status</option>
                            <option
                              value="scrap"
                              selected={x.rejection_rework_status == "scrap"}
                            >
                              scrap
                            </option>
                            <option
                              value="used under deviation"
                              selected={
                                x.rejection_rework_status ==
                                "used under deviation"
                              }
                            >
                              used under deviation
                            </option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please provide category of defects
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Rejection Details:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rejection_rework_details"
                            as="textarea"
                            rows={3}
                            value={x.rejection_rework_details}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Rejection Details
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      {/*<Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">Upload images if any:</Form.Label>
                        <Col sm="6">     
                        <Form.Control column sm="6"type="file"  multiple></Form.Control>
                        </Col>
                      </Row>*/}

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4" className="text-dark">
                          Who has Authorised Rejection:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            placeholder="provide employee ID"
                            required
                            name="rejection_rework_handler"
                            value={x.rejection_rework_handler}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Who will do Rework
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <div className="mt-1 text-center">
                        {props.rejectionDefects.length !== 1 && (
                          <Button
                            className="mx-1 mt-2 mb-2"
                            variant="danger"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </Button>
                        )}
                        {props.rejectionDefects.length - 1 === i && (
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
          <Row className="justify-content-md-center">
            <Col sm="5"></Col>
            <Col sm="2">
              <Button
                className="mb-5"
                type="submit"
                variant="danger"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
/*
onClick={handleSubmit}
*/

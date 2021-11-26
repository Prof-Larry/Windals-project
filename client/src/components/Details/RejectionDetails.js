import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Nav, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import Navbar from "../Navbar/NavbarAdmin";

export default function RejectionDetails(props) {
  const history = useHistory();

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

  localStorage.setItem("rej_report", JSON.stringify(props.rejectionRework));
  localStorage.setItem("rej_defect", JSON.stringify(props.rej_defects));

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.setRejectionRework({ ...props.rejectionRework, [name]: value });
  };

  const handleRemoveClick = (index) => {
    const list = [...props.rej_defects];
    list.splice(index, 1);
    props.setRejDefects(list);
  };

  const handleAddClick = () => {
    props.setRejDefects([
      ...props.rej_defects,
      {
        rej_defect_quantity: "",
        rej_defect: "",
        rej_defect_location: "",
        rej_category_defect: "",
        rej_defect_details: "",
        rej_rework_status: "",
        rej_rework_details: "",
        rej_rework_handler: "",
      },
    ]);
  };

  const handleSubmit = () => {
    const inspection = JSON.parse(localStorage.getItem("inspection"));
    const inp_report = JSON.parse(localStorage.getItem("inp_report"));
    const pdi_report = JSON.parse(localStorage.getItem("pdi_report"));
    const rej_report = JSON.parse(localStorage.getItem("rej_report"));
    const inpro_defect = JSON.parse(localStorage.getItem("inpro_defect"));
    const pdi_defect = JSON.parse(localStorage.getItem("pdi_defect"));
    const rej_defect = JSON.parse(localStorage.getItem("rej_defect"));
    const report = {
      inspection,
      inp_report,
      pdi_report,
      rej_report,
      inpro_defect,
      pdi_defect,
      rej_defect,
    };

    axios
      .post("http://localhost:5050/report/submitReport", report, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT fefege...",
        },
        withCredentials: true,
      })
      .then((res) => {
        // localStorage.removeItem('inp_report');
        // localStorage.removeItem('pdi_report');
        // localStorage.removeItem('rej_report');
        // localStorage.removeItem('inpro_defect');
        // localStorage.removeItem('pdi_defect');
        // localStorage.removeItem('rej_defect');
        // localStorage.removeItem('inspection');

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
        <Form noValidate validated={validated} onSubmit={handleValidate}>
          <Form.Text as={Row} className="justify-content-md-center">
            **Inprocess Rejection**
          </Form.Text>
          <br />
          <Form.Group as={Row} className="justify-content-md-center">
            <Form.Label column sm="3">
              Name of Process
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="rejection_name"
                value={props.rejectionRework.rejection_name}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide Name of Process
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <br />

          <Form.Group as={Row} className="justify-content-md-center">
            <Form.Label column sm="3">
              No. of quantity:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="rejection_total_quantity"
                value={props.rejectionRework.rejection_total_quantity}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide No. of quantity
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <br />

          {props.rej_defects.map((x, i) => {
            return (
              <div className="box">
                <Row className="justify-content-md-center mt-4">
                  <Col sm="8">
                    <Card>
                      <Card.Header className="text-center">
                        DEFECT LIST
                      </Card.Header>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4">
                          defect:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rej_defect"
                            value={x.rej_defect}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide defect
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4">
                          No. of defect specific quantity:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rej_defect_quantity"
                            value={x.rej_defect_quantity}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide No. of defect specific quantity
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4">
                          Location of Defect:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rej_defect_location"
                            value={x.rej_defect_location}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Location of Defect
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-3 mb-1">
                        <Form.Label column sm="4">
                          category of defects:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rej_category_defect"
                            value={x.rej_category_defect}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide category of defects
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4">
                          Details:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rej_defect_details"
                            value={x.rej_defect_details}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Details
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4">
                          Rework:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Check
                            type="radio"
                            name="rej_rework_status"
                            label="Scrap"
                            value="scrap"
                            onChange={(e) => props.addRejDefects(e, i)}
                          />
                          <Form.Check
                            type="radio"
                            name="rej_rework_status"
                            label="Used Under Deviation"
                            value="used under deviation"
                            onChange={(e) => props.addRejDefects(e, i)}
                          />
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4">
                          Rework Details:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rej_rework_details"
                            as="textarea"
                            rows={3}
                            value={x.rej_rework_details}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Rework Details
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <Row className="justify-content-md-center mt-4">
                        <Form.Label column sm="4">
                          Who will do Rework:
                        </Form.Label>
                        <Col sm="6">
                          <Form.Control
                            required
                            name="rej_rework_handler"
                            value={x.rej_rework_handler}
                            onChange={(e) => props.addRejDefects(e, i)}
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Who will do Rework
                          </Form.Control.Feedback>
                        </Col>
                      </Row>

                      <div className="mt-1 text-center">
                        {props.rej_defects.length !== 1 && (
                          <Button
                            className="mx-1 mt-2 mb-2"
                            variant="danger"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </Button>
                        )}
                        {props.rej_defects.length - 1 === i && (
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
              <Button type="submit" variant="danger" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
/*
onClick={handleSubmit}
*/

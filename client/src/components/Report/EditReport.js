import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Nav, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import axios from "axios";
import Navbar from "../Navbar/NavbarAdmin";
import serverUrl from "../../api/index";

export default function EditReport() {
  const [completeReport, setCompleteReport] = useState("");
  const [i_defects, setInpDefects] = useState(
    JSON.parse(localStorage.getItem("edit_i_defects"))
  );
  const [p_defects, setPdiDefects] = useState(
    JSON.parse(localStorage.getItem("edit_p_defects"))
  );
  const [r_defects, setRejDefects] = useState(
    JSON.parse(localStorage.getItem("edit_r_defects"))
  );
  const history = useHistory();
  const location = useLocation();

  const checkAuthorization = async () => {
    try {
      const response = await fetch(`${serverUrl}/report/reportAuthorization`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      history.push("/adminlogin");
    }
  };

  const getReportData = () => {
    axios
      .post(
        `${serverUrl}/report/viewCompleteReport`,
        { id: location.state.id },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "JWT fefege...",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status == 401) {
          throw new Error();
        }
        const d = new Date(`${res.data.report.report_date}`);
        res.data.report.report_date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        const { report, inprocess_defects, pdi_defects, rejection_defects } =
          res.data;
        console.log(res.data);
        setCompleteReport(report);
        setInpDefects(inprocess_defects);
        setPdiDefects(pdi_defects);
        setRejDefects(rejection_defects);
      })
      .catch((e) => {
        alert("Some technical Error, Please Try again later");
      });
  };

  localStorage.setItem("edit_i_defects", JSON.stringify(i_defects));
  localStorage.setItem("edit_p_defects", JSON.stringify(p_defects));
  localStorage.setItem("edit_r_defects", JSON.stringify(r_defects));

  useEffect(() => {
    checkAuthorization();
    getReportData();
  }, []);

  // const handleClick = () => {
  //   history.push("/searchbydate");
  // };
  const handleRepChange = (e) => {
    const { name, value } = e.target;
    setCompleteReport({ ...completeReport, [name]: value });
  };
  const handleInpChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...i_defects];
    list[index][name] = value;
    setInpDefects(list);
  };
  const handlePdiChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...p_defects];
    list[index][name] = value;
    setPdiDefects(list);
  };
  const handleRejChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...r_defects];
    list[index][name] = value;
    setRejDefects(list);
  };

  const handleSubmit = () => {
    // console.log(completeReport);
    // console.log(i_defects);
    // console.log(p_defects);
    // console.log(r_defects);
    axios
      .put(
        `${serverUrl}/report/updateReport`,
        { completeReport, i_defects, p_defects, r_defects },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT fefege...",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        alert(res.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="EditReport">
      <Navbar />

      <Container>
        <Form>
          <Form.Text
            as={Row}
            className=" justify-content-md-center mt-4 text-danger"
          >
            ** Inspection Details **
          </Form.Text>

          <Form.Group
            as={Row}
            className="justify-content-md-center mt-4"
            controlId="validationCustom01"
          >
            <Form.Label column sm="3">
              Plant Code
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="plant_code"
                value={completeReport.plant_code}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide plant code.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="justify-content-md-center mt-4"
            controlId="validationCustom02"
          >
            <Form.Label column sm="3">
              Production Line
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="production_line"
                value={completeReport.production_line}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide production line.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="justify-content-md-center mt-4"
            controlId="validationCustom03"
          >
            <Form.Label column sm="3">
              Product no
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="product_number"
                value={completeReport.product_number}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide product no.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="justify-content-md-center mt-4"
            controlId="validationCustom04"
          >
            <Form.Label column sm="3">
              Product Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="product_name"
                value={completeReport.product_name}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide product name.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Text
            as={Row}
            className=" justify-content-md-center mt-4 text-dark"
          >
            ------------------------------------------------------------------------------------------------------------------
          </Form.Text>

          <Form.Text
            as={Row}
            className=" justify-content-md-center mt-4 text-danger"
          >
            ** Rework Details **
          </Form.Text>

          <Form.Text as={Row} className="justify-content-md-center mt-4">
            **Inprocess Rework**
          </Form.Text>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">
              Name of Process
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="inprocess_name"
                value={completeReport.inprocess_name}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide Name of Process.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">
              No. of quantity:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="inprocess_total_quantity"
                value={completeReport.inprocess_total_quantity}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide No. of quantity.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {i_defects.map((def, index) => {
            return (
              <Row
                className="justify-content-md-center mt-4"
                key={def.defect_id}
              >
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
                          name="inprocess_defect"
                          value={def.inprocess_defect}
                          onChange={(e) => handleInpChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide defect.
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
                          name="inprocess_defect_quantity"
                          value={def.inprocess_defect_quantity}
                          onChange={(e) => handleInpChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide No. of defect specific quantity.
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
                          name="inprocess_defect_location"
                          value={def.inprocess_defect_location}
                          onChange={(e) => handleInpChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Location of Defect.
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
                          name="inprocess_category_defect"
                          value={def.inprocess_category_defect}
                          onChange={(e) => handleInpChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide category of defects.
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
                          name="inprocess_defect_details"
                          value={def.inprocess_defect_details}
                          onChange={(e) => handleInpChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide details.
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
                          name="inprocess_rework_status"
                          label="done"
                          value="done"
                          onChange={(e) => handleInpChange(e, index)}
                        />
                        <Form.Check
                          type="radio"
                          name="inprocess_rework_status"
                          label="incomplete"
                          value="incomplete"
                          onChange={(e) => handleInpChange(e, index)}
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
                          name="inprocess_rework_details"
                          value={def.inprocess_rework_details}
                          onChange={(e) => handleInpChange(e, index)}
                          as="textarea"
                          rows={3}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Rework Details
                        </Form.Control.Feedback>
                      </Col>
                    </Row>

                    <Row className="justify-content-md-center mt-4 mb-4">
                      <Form.Label column sm="4">
                        Who will do Rework:
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          required
                          name="inprocess_rework_handler"
                          value={def.inprocess_rework_handler}
                          onChange={(e) => handleInpChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Who will do Rework.
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            );
          })}

          <Form.Text as={Row} className="justify-content-md-center mt-4">
            **PDI Rework**
          </Form.Text>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">
              Name of Process
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="pdi_name"
                value={completeReport.pdi_name}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide Name of Process.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">
              No. of quantity:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="pdi_total_quantity"
                value={completeReport.pdi_total_quantity}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide No. of quantity.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {p_defects.map((def, index) => {
            return (
              <Row
                className="justify-content-md-center mt-4"
                key={def.defect_id}
              >
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
                          name="pdi_defect"
                          value={def.pdi_defect}
                          onChange={(e) => handlePdiChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide defect.
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
                          name="pdi_defect_quantity"
                          value={def.pdi_defect_quantity}
                          onChange={(e) => handlePdiChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide No. of defect specific quantity.
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
                          name="pdi_defect_location"
                          value={def.pdi_defect_location}
                          onChange={(e) => handlePdiChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Location of Defect.
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
                          name="pdi_category_defect"
                          value={def.pdi_category_defect}
                          onChange={(e) => handlePdiChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide category of defects.
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
                          name="pdi_defect_details"
                          value={def.pdi_defect_details}
                          onChange={(e) => handlePdiChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide details.
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
                          name="pdi_rework_status"
                          label="done"
                          value="done"
                          onChange={(e) => handlePdiChange(e, index)}
                        />
                        <Form.Check
                          type="radio"
                          name="pdi_rework_status"
                          label="incomplete"
                          value="incomplete"
                          onChange={(e) => handlePdiChange(e, index)}
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
                          name="pdi_rework_details"
                          value={def.pdi_rework_details}
                          onChange={(e) => handlePdiChange(e, index)}
                          as="textarea"
                          rows={3}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Rework Details
                        </Form.Control.Feedback>
                      </Col>
                    </Row>

                    <Row className="justify-content-md-center mt-4 mb-4">
                      <Form.Label column sm="4">
                        Who will do Rework:
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          required
                          name="pdi_rework_handler"
                          value={def.pdi_rework_handler}
                          onChange={(e) => handlePdiChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Who will do Rework.
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            );
          })}

          <Form.Text
            as={Row}
            className=" justify-content-md-center mt-4 text-dark"
          >
            ------------------------------------------------------------------------------------------------------------------
          </Form.Text>

          <Form.Text
            as={Row}
            className=" justify-content-md-center mt-4 text-danger"
          >
            ** Rejection Details **
          </Form.Text>

          <Form.Text as={Row} className="justify-content-md-center mt-4">
            **Inprocess Rejection**
          </Form.Text>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">
              Name of Process
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="rejection_name"
                value={completeReport.rejection_name}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide Name of Process
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">
              No. of quantity:
            </Form.Label>
            <Col sm="4">
              <Form.Control
                required
                name="rejection_total_quantity"
                value={completeReport.rejection_total_quantity}
                onChange={handleRepChange}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide No. of quantity
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {r_defects.map((def, index) => {
            return (
              <Row
                className="justify-content-md-center mt-4"
                key={def.defect_id}
              >
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
                          name="rejection_defect"
                          value={def.rejection_defect}
                          onChange={(e) => handleRejChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide defect.
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
                          name="rejection_defect_quantity"
                          value={def.rejection_defect_quantity}
                          onChange={(e) => handleRejChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide No. of defect specific quantity.
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
                          name="rejection_defect_location"
                          value={def.rejection_defect_location}
                          onChange={(e) => handleRejChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Location of Defect.
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
                          name="rejection_category_defect"
                          value={def.rejection_category_defect}
                          onChange={(e) => handleRejChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide category of defects.
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
                          name="rejection_defect_details"
                          value={def.rejection_defect_details}
                          onChange={(e) => handleRejChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide details.
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
                          name={index + 200}
                          label="done"
                          value="done"
                          onChange={(e) => handleRejChange(e, index)}
                        />
                        <Form.Check
                          type="radio"
                          name={index + 200}
                          label="incomplete"
                          value="incomplete"
                          onChange={(e) => handleRejChange(e, index)}
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
                          name="rejection_rework_details"
                          value={def.rejection_rework_details}
                          onChange={(e) => handleRejChange(e, index)}
                          as="textarea"
                          rows={3}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Rework Details
                        </Form.Control.Feedback>
                      </Col>
                    </Row>

                    <Row className="justify-content-md-center mt-4 mb-4">
                      <Form.Label column sm="4">
                        Who will do Rework:
                      </Form.Label>
                      <Col sm="6">
                        <Form.Control
                          required
                          name="rejection_rework_handler"
                          value={def.rejection_rework_handler}
                          onChange={(e) => handleRejChange(e, index)}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please provide Who will do Rework.
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            );
          })}

          <Row className="justify-content-md-end mt-4 mb-2">
            <Col sm="7">
              <Button
                variant="success"
                size="lg"
                className="mx-2"
                onClick={handleSubmit}
              >
                SAVE
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

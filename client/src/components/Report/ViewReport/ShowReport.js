import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import {
  Container,
  Nav,
  Button,
  ButtonGroup,
  Form,
  Card,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import Navbar from "../../Navbar/NavbarAdmin";
import axios from "axios";

export default function ShowReport() {
  const [completeReport, setCompleteReport] = useState("");
  const [i_defects, setInpDefects] = useState("");
  const [p_defects, setPdiDefects] = useState("");
  const [r_defects, setRejDefects] = useState("");
  const history = useHistory();
  const location = useLocation();

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

  const getReportData = () => {
    axios
      .post(
        "http://localhost:5050/report/viewCompleteReport",
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
        const { report, inprocess_defects, pdi_defects, rejection_defects } =
          res.data;
        setCompleteReport(report);
        setInpDefects(inprocess_defects);
        setPdiDefects(pdi_defects);
        setRejDefects(rejection_defects);
      })
      .catch((e) => {
        alert("Some technical Error, Please Try again later");
      });
  };

  useEffect(() => {
    checkAuthorization();
    getReportData();
  }, []);

  const handleClick = () => {
    history.push("/searchbydate");
    // console.log(completeReport);
    // console.log(i_defects);
    // console.log(p_defects);
    // console.log(r_defects);
  };

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <Navbar />
      <Container>
        <Form>
          <Form.Text
            as={Row}
            className=" justify-content-md-center mt-4 text-danger"
          >
            ** The following report is view only and cannot be edited **
          </Form.Text>

          <Row className=" justify-content-md-start mt-4">
            <Col sm="4">
            <strong>
              <Form.Label className="text-dark">
                * Report_1
              </Form.Label>
            </strong>
            </Col>

            <Col>
            <strong>
            <Form.Label as={Row} className="justify-content-md-end text-dark">
              Date: DD/MM/YYYY
            </Form.Label>
            </strong>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
            <strong>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              Date of Inspection:
            </Form.Label>
            </strong>
            </Col>
            <Col>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              **Input Here**
            </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
            <strong>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              Plant Code:
            </Form.Label>
            </strong>
            </Col>
            <Col>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              **Input Here**
            </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
            <strong>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              Production line:
            </Form.Label>
            </strong>
            </Col>
            <Col>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              **Input Here**
            </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
            <strong>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              Product No:
            </Form.Label>
            </strong>
            </Col>
            <Col>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              **Input Here**
            </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
            <strong>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              Product Name:
            </Form.Label>
            </strong>
            </Col>
            <Col>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              **Input Here**
            </Form.Label>
            </Col>
          </Row>

            <strong>
            <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
              * Inprocess Rework
            </Form.Label>
            </strong>

          <Row className=" justify-content-md-center">
            <Col >
              <Table bordered className="mt-4">
                <thead className="text-dark">
                    <tr className="text-dark">
                      <th className="text-dark">Sr.No</th>
                      <th className="text-dark">Name of the Process</th>
                      <th className="text-dark">No. of defective quantity</th>
                      <th className="text-dark">Defect</th>
                      <th className="text-dark">Category of Defect</th>
                      <th className="text-dark">Rework Status</th>
                      <th className="text-dark">Email</th>
                    </tr>
                </thead>
                <tbody className="text-dark" >
                      <tr>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                      </tr>
                </tbody>
                </Table>
            </Col>
          </Row>

          <strong>
          <Form.Label as={Row} className=" justify-content-md-start mt-1 text-dark">
            * PDI Rework
          </Form.Label>
          </strong>

          <Row className=" justify-content-md-center">
            <Col >
              <Table bordered className="mt-4">
                <thead className="text-dark">
                    <tr className="text-dark">
                      <th className="text-dark">Sr.No</th>
                      <th className="text-dark">Name of the Process</th>
                      <th className="text-dark">No. of defective quantity</th>
                      <th className="text-dark">Defect</th>
                      <th className="text-dark">Category of Defect</th>
                      <th className="text-dark">Rework Status</th>
                      <th className="text-dark">Email</th>
                    </tr>
                </thead>
                <tbody className="text-dark" >
                      <tr>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                        <td>xxx</td>
                      </tr>
                </tbody>
                </Table>
            </Col>
          </Row>

          <Button
          variant="danger"
          size="lg"
          className="mb-3"
          onClick={handleClick}
        >
          Back
        </Button>
      </Form>
      </Container>
    </div>
  );
}

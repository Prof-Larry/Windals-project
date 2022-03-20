import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Container, Button, Form, Row, Col, Table } from "react-bootstrap";
import Navbar from "../../Navbar/NavbarAdmin";
import axios from "axios";
import serverUrl from "../../../api/index";

export default function ShowReport() {
  const [completeReport, setCompleteReport] = useState("");
  const [rew_defects, setRewDefects] = useState(
    JSON.parse(sessionStorage.getItem("rew_defects"))
  );
  const [rej_defects, setRejDefects] = useState(
    JSON.parse(sessionStorage.getItem("rej_defects"))
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
        res.data.report.report_date = `${d.getDate()}/${
          d.getMonth() + 1
        }/${d.getFullYear()}`;
        const { report, rework_defects, rejection_defects } = res.data;
        console.log(res.data);
        setCompleteReport(report);
        setRewDefects(rework_defects);
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
                  * Report_{completeReport.report_id}
                </Form.Label>
              </strong>
            </Col>

            <Col>
              <strong>
                <Form.Label
                  as={Row}
                  className="justify-content-md-end text-dark"
                >
                  Date: {completeReport.report_date}
                </Form.Label>
              </strong>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
              <strong>
                <Form.Label
                  as={Row}
                  className=" justify-content-md-start mt-1 text-dark"
                >
                  Date of Inspection:
                </Form.Label>
              </strong>
            </Col>
            <Col>
              <Form.Label
                as={Row}
                className=" justify-content-md-start mt-1 text-dark"
              >
                {completeReport.report_date}
              </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
              <strong>
                <Form.Label
                  as={Row}
                  className=" justify-content-md-start mt-1 text-dark"
                >
                  Plant Code:
                </Form.Label>
              </strong>
            </Col>
            <Col>
              <Form.Label
                as={Row}
                className=" justify-content-md-start mt-1 text-dark"
              >
                {completeReport.plant_code}
              </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
              <strong>
                <Form.Label
                  as={Row}
                  className=" justify-content-md-start mt-1 text-dark"
                >
                  Production line:
                </Form.Label>
              </strong>
            </Col>
            <Col>
              <Form.Label
                as={Row}
                className=" justify-content-md-start mt-1 text-dark"
              >
                {completeReport.production_line}
              </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
              <strong>
                <Form.Label
                  as={Row}
                  className=" justify-content-md-start mt-1 text-dark"
                >
                  Product No:
                </Form.Label>
              </strong>
            </Col>
            <Col>
              <Form.Label
                as={Row}
                className=" justify-content-md-start mt-1 text-dark"
              >
                {completeReport.product_number}
              </Form.Label>
            </Col>
          </Row>

          <Row className=" justify-content-md-start mt-1">
            <Col sm="4">
              <strong>
                <Form.Label
                  as={Row}
                  className=" justify-content-md-start mt-1 text-dark"
                >
                  Product Name:
                </Form.Label>
              </strong>
            </Col>
            <Col>
              <Form.Label
                as={Row}
                className=" justify-content-md-start mt-1 text-dark"
              >
                {completeReport.product_name}
              </Form.Label>
            </Col>
          </Row>

          <strong>
            <Form.Label
              as={Row}
              className=" justify-content-md-start mt-4 text-dark"
            >
              * {completeReport.report_type} Rework
            </Form.Label>
          </strong>

          <Row className=" justify-content-md-center mt-1">
            <Col>
              <Table bordered className="mt-1">
                <thead className="text-dark">
                  <tr className="text-dark">
                    <th className="text-dark">Sr. No</th>
                    <th className="text-dark">Name of the Process</th>
                    <th className="text-dark">No. of defective quantity</th>
                    <th className="text-dark">Defect</th>
                    <th className="text-dark">Category of Defect</th>
                    <th className="text-dark">Rework Status</th>
                    <th className="text-dark">Employee ID</th>
                  </tr>
                </thead>
                <tbody className="text-dark">
                  {rew_defects.map((def) => {
                    return (
                      <tr>
                        <td>{def.defect_id}</td>
                        <td>{completeReport.rework_process}</td>
                        <td>{def.rework_defect_quantity}</td>
                        <td>{def.rework_defect}</td>
                        <td>{def.rework_category_defect}</td>
                        <td>{def.rework_rework_status}</td>
                        <td>{completeReport.admin_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>

          <strong>
            <Form.Label
              as={Row}
              className=" justify-content-md-start mt-4 text-dark"
            >
              * REJECTION Rework
            </Form.Label>
          </strong>

          <Row className=" justify-content-md-center">
            <Col>
              <Table bordered className="mt-1">
                <thead className="text-dark">
                  <tr className="text-dark">
                    <th className="text-dark">Sr. No</th>
                    <th className="text-dark">Name of the Process</th>
                    <th className="text-dark">No. of defective quantity</th>
                    <th className="text-dark">Defect</th>
                    <th className="text-dark">Category of Defect</th>
                    <th className="text-dark">Rework Status</th>
                    <th className="text-dark">Employee ID</th>
                  </tr>
                </thead>
                <tbody className="text-dark">
                  {rej_defects.map((def) => {
                    return (
                      <tr>
                        <td>{def.defect_id}</td>
                        <td>{completeReport.rejection_process}</td>
                        <td>{def.rejection_defect_quantity}</td>
                        <td>{def.rejection_defect}</td>
                        <td>{def.rejection_category_defect}</td>
                        <td>{def.rejection_rework_status}</td>
                        <td>{completeReport.admin_id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Button
            variant="danger"
            size="lg"
            className="mb-3 mt-2"
            onClick={handleClick}
          >
            Back
          </Button>
        </Form>
      </Container>
    </div>
  );
}

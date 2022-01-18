import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Form, Row, Col, Table } from "react-bootstrap";
import Navbar from "../../Navbar/NavbarAdmin";
import { useHistory } from "react-router";

export default function SearchByDate() {
  const [showMaster, setShowMaster] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [show, setShow] = useState(false);
  const [reports, setReports] = useState(
    JSON.parse(sessionStorage.getItem("reports")) || []
  );

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
      data.designation === "M" ? setShowMaster(true) : setShowMaster(false);

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
    if (reports && show) {
      setShow(true);
    }
  }, []);

  const handleClick = () => {
    axios
      .post(
        "http://localhost:5050/report/viewReport",
        { from, to },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "JWT fefege...",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 401) {
          throw new Error();
        }
        sessionStorage.setItem("reports", JSON.stringify(res.data));
        setReports(res.data);
        setShow(true);
      })
      .catch((e) => {
        alert("Some technical Error, please try again later");
      });
  };

  const handleClickView = (e) => {
    const { value } = e.target;
    sessionStorage.setItem("rew_defects", JSON.stringify([]));
    sessionStorage.setItem("rej_defects", JSON.stringify([]));
    history.push("/showreport", { id: value });
  };

  const handleClickEdit = (e) => {
    const { value } = e.target;
    sessionStorage.setItem("edit_rework_defects", JSON.stringify([]));
    sessionStorage.setItem("edit_rework_defects", JSON.stringify([]));
    history.push("/editreport", { id: value });
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
            **Please enter the following details to view the report you have
            submitted**
          </Form.Text>
          <Form.Group>
            <Form.Label
              as={Row}
              className=" justify-content-md-center mt-5 text-dark"
            >
              {" "}
              Get the reports submitted from:
            </Form.Label>
            <br />
            <Row className=" justify-content-md-center">
              <Col sm="3">
                <Form.Control
                  type="date"
                  onChange={(e) => setFrom(e.target.value)}
                ></Form.Control>
              </Col>
              <Col sm="1">
                <Form.Label className="text-dark">To</Form.Label>
              </Col>
              <Col sm="3">
                <Form.Control
                  type="date"
                  onChange={(e) => setTo(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <center>
            <Button
              variant="danger"
              size="lg"
              className="mt-5"
              onClick={handleClick}
            >
              Get Reports
            </Button>
          </center>
        </Form>
      </Container>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        <Container>
          <Row className=" justify-content-md-center">
            <Col>
              <Table bordered className="mt-4">
                {show ? (
                  <thead className="text-dark">
                    <tr className="text-dark">
                      <th className="text-dark">Sr.No</th>
                      <th className="text-dark">Date</th>
                      <th className="text-dark">Report Type</th>
                      <th className="text-dark">Plant Code</th>
                      <th className="text-dark">Production Line</th>
                      <th className="text-dark">Product Name</th>
                      <th className="text-dark">Rework Process</th>
                      <th className="text-dark">Rejection Process</th>
                      <th className="text-dark">Admin</th>
                      <th className="text-dark">View</th>
                      {showMaster ? <th className="text-dark">Edit</th> : null}
                    </tr>
                  </thead>
                ) : null}
                {reports.map((report) => {
                  const d = new Date(`${report.report_date}`);

                  return (
                    <tbody className="text-dark" key={report.report_id}>
                      <tr key={report.report_id}>
                        <td>{report.report_id}</td>
                        <td>
                          {d.getDate()}-{d.getMonth() + 1}-{d.getFullYear()}
                        </td>
                        <td>{report.report_type}</td>
                        <td>{report.plant_code}</td>
                        <td>{report.production_line}</td>
                        <td>{report.product_name}</td>
                        <td>{report.rework_process}</td>
                        <td>{report.rejection_process}</td>
                        <td>{report.admin_id}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            value={report.report_id}
                            onClick={handleClickView}
                          >
                            View
                          </Button>
                        </td>
                        {showMaster ? (
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              value={report.report_id}
                              onClick={handleClickEdit}
                            >
                              Edit
                            </Button>
                          </td>
                        ) : null}
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
      ;
    </div>
  );
}

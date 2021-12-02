import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Table } from "react-bootstrap";
import Navbar from "../Navbar/NavbarAdmin";
import { useHistory } from "react-router";
import axios from "axios";

export default function MyRework() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [p_defects, setPdiDefects] = useState(
    JSON.parse(localStorage.getItem("p_defects"))
  );
  const [i_defects, setInpDefects] = useState(
    JSON.parse(localStorage.getItem("i_defects"))
  );

  const checkAuthorization = () => {
    axios
      .get("http://localhost:5050/myrework", {
        headers: {
          "Content-type": "application/json",
          Authorization: "JWT fefege...",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 401) throw new Error();

        console.log(res.data);
        const { inprocess_defects, pdi_defects } = res.data;
        // localStorage.setItem("i_defects", JSON.stringify(inprocess_defects));
        // localStorage.setItem("p_defects", JSON.stringify(pdi_defects));
        setInpDefects(inprocess_defects);
        setPdiDefects(pdi_defects);
        setShow(true);
      })
      .catch((e) => {
        history.push("/adminlogin");
      });
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <Navbar />

      <Container>
        <Row className=" justify-content-md-center">
          <Col sm="8">
            <Form.Label className=" mt-4 mb-2 text-dark">
              * Your pending reworks are as follows:{" "}
            </Form.Label>
          </Col>
        </Row>
        <Row className=" justify-content-md-center">
          <Col>
            <Table bordered className="mt-4">
              {show ? (
                <thead className="text-dark">
                  <tr className="text-dark">
                    <th className="text-dark">defect_id</th>
                    <th className="text-dark">inprocess_defect_quantity</th>
                    <th className="text-dark">inprocess_defect</th>
                    <th className="text-dark">inprocess_defect_location</th>
                    <th className="text-dark">inprocess_category_defect</th>
                    <th className="text-dark">inprocess_defect_details</th>
                    <th className="text-dark">inprocess_rework_status</th>
                    <th className="text-dark">inprocess_rework_details</th>
                    <th className="text-dark">inprocess_rework_handler</th>
                  </tr>
                </thead>
              ) : null}
              {i_defects
                ? i_defects.map((defect) => {
                    return (
                      <tbody className="text-dark" key={defect.defect_id}>
                        <tr key={defect.defect_id}>
                          <td>{defect.defect_id}</td>
                          <td>{defect.inprocess_defect_quantity}</td>
                          <td>{defect.inprocess_defect}</td>
                          <td>{defect.inprocess_defect_location}</td>
                          <td>{defect.inprocess_category_defect}</td>
                          <td>{defect.inprocess_defect_details}</td>
                          <td>{defect.inprocess_rework_status}</td>
                          <td>{defect.inprocess_rework_details}</td>
                          <td>{defect.inprocess_rework_handler}</td>
                          {/* <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    value={defect.defect_id}
                                                    onClick={handleClickView}
                                                >
                                                    View
                                                </Button>
                                            </td> */}
                        </tr>
                      </tbody>
                    );
                  })
                : null}
            </Table>
          </Col>
        </Row>
        <Row className=" justify-content-md-center">
          <Col >
            <Table bordered className="mt-4">
              {show ? (
                <thead className="text-dark">
                  <tr className="text-dark">
                    <th className="text-dark">defect_id</th>
                    <th className="text-dark">pdi_defect_quantity</th>
                    <th className="text-dark">pdi_defect</th>
                    <th className="text-dark">pdi_defect_location</th>
                    <th className="text-dark">pdi_category_defect</th>
                    <th className="text-dark">pdi_defect_details</th>
                    <th className="text-dark">pdi_rework_status</th>
                    <th className="text-dark">pdi_rework_details</th>
                    <th className="text-dark">pdi_rework_handler</th>
                  </tr>
                </thead>
              ) : null}
              {p_defects
                ? p_defects.map((defect) => {
                    return (
                      <tbody className="text-dark" key={defect.defect_id}>
                        <tr key={defect.defect_id}>
                          <td>{defect.defect_id}</td>
                          <td>{defect.pdi_defect_quantity}</td>
                          <td>{defect.pdi_defect}</td>
                          <td>{defect.pdi_defect_location}</td>
                          <td>{defect.pdi_category_defect}</td>
                          <td>{defect.pdi_defect_details}</td>
                          <td>{defect.pdi_rework_status}</td>
                          <td>{defect.pdi_rework_details}</td>
                          <td>{defect.pdi_rework_handler}</td>
                          {/* <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    value={defect.defect_id}
                                                    onClick={handleClickView}
                                                >
                                                    View
                                                </Button>
                                            </td> */}
                        </tr>
                      </tbody>
                    );
                  })
                : null}
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";
import Navbar from "../Navbar/NavbarAdmin";
import { useHistory } from "react-router";
import axios from "axios";

export default function MyRework() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [r_defects, setReworkDefects] = useState(
    JSON.parse(sessionStorage.getItem("r_defects")) || []
  );
  const [user, setUser] = useState();

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
        const { rework_defects, user } = res.data;
        // localStorage.setItem("i_defects", JSON.stringify(inprocess_defects));
        // localStorage.setItem("p_defects", JSON.stringify(rework_defects));
        setReworkDefects(rework_defects);
        setUser(user);
        setShow(true);
      })
      .catch((e) => {
        history.push("/adminlogin");
      });
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  const handleClickComplete = () => {
    // history.push("/reworktodo");
  };

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
                    <th className="text-dark">defect id</th>
                    <th className="text-dark">defect quantity</th>
                    <th className="text-dark">defect</th>
                    <th className="text-dark">defect location</th>
                    <th className="text-dark">category defect</th>
                    <th className="text-dark">defect details</th>
                    <th className="text-dark">rework status</th>
                    <th className="text-dark">rework details</th>
                    <th className="text-dark">rework handler</th>
                    <th className="text-dark">Rework</th>
                  </tr>
                </thead>
              ) : null}
              {r_defects
                ? r_defects.map((defect) => {
                    return (
                      <tbody className="text-dark" key={defect.defect_id}>
                        <tr key={defect.defect_id}>
                          <td>{defect.defect_id}</td>
                          <td>{defect.rework_defect_quantity}</td>
                          <td>{defect.rework_defect}</td>
                          <td>{defect.rework_defect_location}</td>
                          <td>{defect.rework_category_defect}</td>
                          <td>{defect.rework_defect_details}</td>
                          <td>{defect.rework_rework_status}</td>
                          <td>{defect.rework_rework_details}</td>
                          <td>{defect.rework_rework_handler}</td>
                          <td>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={handleClickComplete}
                            >
                              Completed
                            </Button>
                          </td>
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

//{/*value={defect.defect_id}*/} value={defect.defect_id}

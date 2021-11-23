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
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
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
    axios.post("http://localhost:5050/report/viewCompleteReport", { id: location.state.id }, {
      headers: {
        "Content-type": "application/json",
        Authorization: "JWT fefege...",
      },
      withCredentials: true,
    })
      .then(res => {
        if (res.status == 401) {
          throw new Error();
        }
        const { report, inprocess_defects, pdi_defects, rejection_defects } = res.data;
        setCompleteReport(report);
        setInpDefects(inprocess_defects);
        setPdiDefects(pdi_defects);
        setRejDefects(rejection_defects);
      })
      .catch(e => {
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
        <h1>show report</h1>
        <Button
          variant="danger"
          size="lg"
          className="mb-3"
          onClick={handleClick}
        >
          Back
        </Button>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
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

export default function ShowReport() {
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

  const handleClick = () => {
    history.push("/searchbydate");
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

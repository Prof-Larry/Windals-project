import React from "react";
import Navbar from "../Navbar/NavbarAdmin";
import { Container, Form, Row, Col, Table, Button } from "react-bootstrap";

export default function ReworkToDo() {
  return (
    <div
      style={{ justifyContent: "center", alignItems: "center" }}
      className="ReworkToDo"
    >
      <Navbar />


      <Container>
        <Form>

          <strong><Form.Label as={Row} className="justify-content-md-center mt-4 text-dark">
            (inprocess/pdi *input) Rework</Form.Label></strong>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">Defect:</Form.Label>
            <Col sm="4">
              <Form.Control required name="inprocess_total_quantity" ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide Defect.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">No. of defect specific quantity:</Form.Label>
            <Col sm="4">
              <Form.Control required name="inprocess_total_quantity" ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide No. of defect specific quantity.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">Location of Defect:</Form.Label>
            <Col sm="4">
              <Form.Control required name="inprocess_total_quantity" ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide Location of Defect.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">Category of Defects:</Form.Label>
            <Col sm="4">
              <Form.Control required name="inprocess_total_quantity" ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide Category of Defects.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">Details:</Form.Label>
            <Col sm="4">
              <Form.Control required name="inprocess_total_quantity" ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide Details.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">Rework:</Form.Label>
              <Col sm="4">
                <Form.Check type="radio" name="Rework_Status" label="done" value="done"
                   />
                <Form.Check type="radio" name="Rework_Status" label="incomplete" value="incomplete"
                   />
              </Col>
          </Form.Group>         



          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">Rework Details:</Form.Label>
            <Col sm="4">
              <Form.Control required name="inprocess_total_quantity" as="textarea" rows={3}></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide Rework Details.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-md-center mt-4">
            <Form.Label column sm="3">Who will do Rework:</Form.Label>
            <Col sm="4">
              <Form.Control required name="inprocess_total_quantity" ></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide Who will do Rework.</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <center><Button type="submit" variant="success" className="mt-4 mb-4">Save</Button></center>

        </Form>
      </Container>

    </div>
  );
}

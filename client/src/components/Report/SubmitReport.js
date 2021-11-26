import React, { useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";

export default function SubmitReport() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="App">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}
/*
                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Rework</Form.Label>
                        <Col sm="4">
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Done"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        name="inprocess_rework_status"
                                        value="Done"
                                        onChange={updateEachDefect}
                                    />
                                    <Form.Check
                                        inline
                                        label="Incomplete"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        name="inprocess_rework_status"
                                        value="Incomplete"
                                        onChange={updateEachDefect}
                                    />
                                </div>
                            ))}
                        </Col>
                    </Form.Group>
                    <br />


style={{ width: '50rem' }}

                    <Form.Group as={Row} className="justify-content-md-center">
                        <Form.Label column sm="3">Details</Form.Label>
                        <Col sm="4">
                            <Form.Control ></Form.Control>
                        </Col>
                    </Form.Group>




<Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">WINDALS</Navbar.Brand>

                    <Nav className="SubmitReport">
                        <Nav.Link href="#inspection">Inspection Details</Nav.Link>
                        <Nav.Link href="#rework">Rework Details</Nav.Link>
                        <Nav.Link href="#rejection">Rejection Details</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>        */

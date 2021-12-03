import React from 'react'
import { Button, Container, Form, Row, Col, Nav, Card } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Navbar from '../Navbar/NavbarAdmin'



export default function EditReport() {
    return (
        <div className="EditReport">
            <Navbar/>
            
            <Container >
                <Form>
                    <Form.Text as={Row} className=" justify-content-md-center mt-4 text-danger">
                        ** Inspection Details **
                    </Form.Text>

                    <Form.Group as={Row} className="justify-content-md-center mt-4" controlId="validationCustom01">
                        <Form.Label column sm="3">Plant Code</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="plant_code"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide plant code.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    

                    <Form.Group as={Row} className="justify-content-md-center mt-4" controlId="validationCustom02">
                        <Form.Label column sm="3">Production Line</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="production_line"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide production line.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    

                    <Form.Group as={Row} className="justify-content-md-center mt-4" controlId="validationCustom03">
                        <Form.Label column sm="3">Product no</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="product_number"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide product no.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    

                    <Form.Group as={Row} className="justify-content-md-center mt-4" controlId="validationCustom04">
                        <Form.Label column sm="3">Product Name</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="product_name"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide product name.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Text as={Row} className=" justify-content-md-center mt-4 text-dark">
                        ------------------------------------------------------------------------------------------------------------------
                    </Form.Text>

                    <Form.Text as={Row} className=" justify-content-md-center mt-4 text-danger">
                        ** Rework Details **
                    </Form.Text>

                    <Form.Text as={Row} className="justify-content-md-center mt-4" >**Inprocess Rework**</Form.Text>
                    
                    <Form.Group as={Row} className="justify-content-md-center mt-4">
                        <Form.Label column sm="3">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="inprocess_name"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide Name of Process.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    

                    <Form.Group as={Row} className="justify-content-md-center mt-4">
                        <Form.Label column sm="3">No. of quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="inprocess_total_quantity"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide No. of quantity.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                <Row className="justify-content-md-center mt-4">
                <Col sm="8">
                    <Card >
                        <Card.Header className="text-center">DEFECT LIST</Card.Header>

                            <Row className="justify-content-md-center mt-4">
                                <Form.Label column sm="4">defect:</Form.Label>
                                <Col sm="6">
                                    <Form.Control required name="inprocess_defect"></Form.Control>
                                        <Form.Control.Feedback type="invalid">Please provide defect.</Form.Control.Feedback>
                                        </Col>
                                        </Row>

                                    <Row className="justify-content-md-center mt-4">
                                        <Form.Label column sm="4">No. of defect specific quantity:</Form.Label>
                                        <Col sm="6">
                                            <Form.Control required name="inprocess_defect_quantity"></Form.Control>
                                            <Form.Control.Feedback type="invalid">Please provide No. of defect specific quantity.</Form.Control.Feedback>
                                        </Col>
                                        </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Location of Defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_defect_location" ></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Location of Defect.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-3 mb-1">
                                                <Form.Label column sm="4">category of defects:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_category_defect"></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide category of defects.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_defect_details" ></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide details.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Check type="radio" name="inprocess_rework_status" label="done" value="done"
                                                         />
                                                    <Form.Check type="radio" name="inprocess_rework_status" label="incomplete" value="incomplete"
                                                         />
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_rework_details" as="textarea" rows={3} ></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Rework Details</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4 mb-4">
                                                <Form.Label column sm="4">Who will do Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_rework_handler"></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Who will do Rework.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                        </Card>
                                        </Col>
                                        </Row>
                        
                        <Form.Text as={Row} className="justify-content-md-center mt-4" >**PDI Rework**</Form.Text> 

                        <Form.Group as={Row} className="justify-content-md-center mt-4">
                        <Form.Label column sm="3">Name of Process</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="pdi_name"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide Name of Process.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    

                    <Form.Group as={Row} className="justify-content-md-center mt-4">
                        <Form.Label column sm="3">No. of quantity:</Form.Label>
                        <Col sm="4">
                            <Form.Control required name="pdi_total_quantity"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide No. of quantity.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                <Row className="justify-content-md-center mt-4">
                <Col sm="8">
                    <Card >
                        <Card.Header className="text-center">DEFECT LIST</Card.Header>

                            <Row className="justify-content-md-center mt-4">
                                <Form.Label column sm="4">defect:</Form.Label>
                                <Col sm="6">
                                    <Form.Control required name="pdi_defect"></Form.Control>
                                        <Form.Control.Feedback type="invalid">Please provide defect.</Form.Control.Feedback>
                                        </Col>
                                        </Row>

                                    <Row className="justify-content-md-center mt-4">
                                        <Form.Label column sm="4">No. of defect specific quantity:</Form.Label>
                                        <Col sm="6">
                                            <Form.Control required name="pdi_defect_quantity"></Form.Control>
                                            <Form.Control.Feedback type="invalid">Please provide No. of defect specific quantity.</Form.Control.Feedback>
                                        </Col>
                                        </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Location of Defect:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_defect_location" ></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Location of Defect.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-3 mb-1">
                                                <Form.Label column sm="4">category of defects:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_category_defect"></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide category of defects.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="pdi_defect_details" ></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide details.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Check type="radio" name="pdi_rework_status" label="done" value="done"
                                                         />
                                                    <Form.Check type="radio" name="pdi_rework_status" label="incomplete" value="incomplete"
                                                         />
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4">
                                                <Form.Label column sm="4">Rework Details:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_rework_details" as="textarea" rows={3} ></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Rework Details</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                            <Row className="justify-content-md-center mt-4 mb-4">
                                                <Form.Label column sm="4">Who will do Rework:</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control required name="inprocess_rework_handler"></Form.Control>
                                                    <Form.Control.Feedback type="invalid">Please provide Who will do Rework.</Form.Control.Feedback>
                                                </Col>
                                            </Row>

                                        </Card>
                                        </Col>
                                        </Row>
                    
                    <Form.Text as={Row} className=" justify-content-md-center mt-4 text-dark">
                        ------------------------------------------------------------------------------------------------------------------
                    </Form.Text>
               
                    <Form.Text as={Row} className=" justify-content-md-center mt-4 text-danger">
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
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide No. of quantity
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Row className="justify-content-md-center mt-4">
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
                            name="rej_defect"
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide defect
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
                            name="rej_defect_quantity"
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide No. of defect specific quantity
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
                            name="rej_defect_location"
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Location of Defect
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
                            name="rej_category_defect"
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide category of defects
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
                            name="rej_defect_details"
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Details
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
                            name="rej_rework_status"
                            label="Scrap"
                          />
                          <Form.Check
                            type="radio"
                            name="rej_rework_status"
                            label="Used Under Deviation"
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
                            name="rej_rework_details"
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
                            name="rej_rework_handler"
                          ></Form.Control>
                          <Form.Control.Feedback type="invalid">
                            Please provide Who will do Rework
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>      
                    
                    
                    <Row className="justify-content-md-end mt-4 mb-2">
                            <Col sm="7">
                                <Button type="submit" variant="success" size="lg" className="mx-2" >SAVE</Button>
                            </Col>
                    </Row>
                </Form>
            </Container>
            
        </div>
    )
}
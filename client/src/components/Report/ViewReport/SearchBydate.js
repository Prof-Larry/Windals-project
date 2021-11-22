import React, { useState } from 'react'
import {  Container, Nav, Button, ButtonGroup, Form, Card, Row, Col ,InputGroup} from 'react-bootstrap'
import { Link, } from 'react-router-dom'
import Navbar from '../../Navbar/NavbarAdmin'


export default function SearchByDate() {

    return(
        <div style={{justifyContent:'center', alignItems:'center'}}>
            <Navbar/>
            <Container>    
                <Form>
                    <Form.Text as={Row} className=" justify-content-md-center mt-4 text-danger">**Please enter the following details to view the report you have submitted**</Form.Text>
                    <Form.Group>
                        <Form.Label as={Row} className=" justify-content-md-center mt-5 text-dark"> Get the reports submitted from:</Form.Label>
                        <br/>
                        <Row className=" justify-content-md-center">
                            <Col sm="3"><Form.Control type="date"></Form.Control></Col>
                            <Col sm="1"><Form.Label className="text-dark">To</Form.Label></Col>
                            <Col sm="3"><Form.Control type="date"></Form.Control></Col>
                        </Row>
                    </Form.Group>
                    <center><Button variant="danger" size="lg" className="mt-5" onClick={event => window.location.href = '/reportstable'} >Get Reports</Button></center>
                </Form>    
            </Container>
        </div>
    );


}
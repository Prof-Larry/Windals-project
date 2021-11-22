import React, { useState } from 'react'
import { Container, Nav, Button, ButtonGroup, Form, Card, Row, Col ,Table} from 'react-bootstrap'
import { Link, } from 'react-router-dom'
import Navbar from '../Navbar/NavbarAdmin'


export default function MyRework() {

    return(
        <div style={{justifyContent:'center', alignItems:'center'}}>
            
            <Navbar/>
            
            <Container>    
                <Row className=" justify-content-md-center">
                    <Col sm="8"><Form.Label className=" mt-4 mb-2 text-dark">* Your pending reworks are as follows: </Form.Label></Col>
                </Row>
                <Row className=" justify-content-md-center">
                    <Col sm="8">
                    <Table bordered className="mt-4">
                        <thead className="text-dark"> 
                            <tr className="text-dark">
                                <th className="text-dark">Sr.No</th>
                                <th className="text-dark">Date</th>
                                <th className="text-dark">Plant code</th>
                                <th className="text-dark">Production Line</th>
                                <th className="text-dark">Product Name</th>
                                <th className="text-dark">Link</th>
                            </tr>
                        </thead>
                        <tbody className="text-dark">
                            <tr>
                                <td>1</td>
                                <td>dd/mm/yyyy</td>
                                <td>xxxxx 1</td>
                                <td>yyyyy 1</td>
                                <td>zzzzz 1</td>
                                <td><Link to="/reworktodo">View</Link></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>dd/mm/yyyy</td>
                                <td>xxxxx 2</td>
                                <td>yyyyy 2</td>
                                <td>zzzzz 2</td>
                                <td><Link to="/reworktodo">View</Link></td>
                            </tr>
                            
                            
                        </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
        </div>
    );


}
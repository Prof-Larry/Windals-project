import React, { useState } from 'react'
import {  Container, Nav, Button, ButtonGroup, Form, Card, Row, Col ,InputGroup} from 'react-bootstrap'
import { Link, } from 'react-router-dom'
import Navbar from '../../Navbar/NavbarAdmin'


export default function ShowReport() {

    return(
        <div style={{justifyContent:'center', alignItems:'center'}}>
            <Navbar/>
            <Container>
                <h1>show report</h1>
                <Button variant="danger" size="lg" className="mb-3" onClick={event => window.location.href = '/reportstable'} >Back</Button>
            </Container>
        </div>
    );


}
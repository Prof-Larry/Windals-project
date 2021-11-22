import React, { useState } from 'react'
import { Container, Nav, Button, ButtonGroup, Form, Card, Row, Col ,InputGroup} from 'react-bootstrap'
import { Link, } from 'react-router-dom'
import Navbar from '../Navbar/NavbarAdmin'


export default function MyRework() {

    return(
        <div style={{justifyContent:'center', alignItems:'center'}}>
            
            <Navbar/>
            
            <Container >
                <h1>my rework</h1>
            </Container>
        </div>
    );


}
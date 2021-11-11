import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Adminhome.css";
import { useHistory } from 'react-router';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../Navbar/NavbarAdmin'


export default function Adminhome() {
    const history = useHistory();
    const checkAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:5000/adminhome', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);
            if (response.status !== 200) {
                throw new Error(response.error);
            }
        } catch (error) {
            console.log(error);
            history.push('/adminlogin');
        }

    }


    // useEffect(() => {
    //     checkAuthentication();
    // }, []);


    const [show, setShow] = useState(false);

    return (
        <div className="adminHome">
            <Navbar />
            <br />
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm="5">
                        <Row><Button variant="secondary" size="lg" className="mb-3" onClick={() => setShow(!show)}>PDI Report</Button></Row>

                        {show ? <Row><Button variant="secondary" size="lg" className="mb-3" onClick={event => window.location.href = '/viewreport'}>View Report</Button></Row> : null}
                        {show ? <Row><Button variant="secondary" size="lg" className="mb-3" onClick={event => window.location.href = '/editreport'}>Edit Report</Button></Row> : null}
                        {show ? <Row><Button variant="secondary" size="lg" className="mb-3" onClick={event => window.location.href = '/inspection'}>Submit Report</Button></Row> : null}


                    </Col>
                </Row>
            </Container>


        </div>


    )
}

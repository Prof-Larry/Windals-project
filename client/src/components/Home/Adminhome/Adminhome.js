import React, { useState } from 'react';
import { useEffect } from 'react';
import "./Adminhome.css";
import { useHistory } from 'react-router';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../Navbar/NavbarAdmin';
import { LineChart, Line, CartesianGrid, XAxis, Legend, YAxis, AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';


export default function Adminhome() {

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const data = [{
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    }
    ];

    const history = useHistory();
    const checkAuthentication = async () => {
        try {
            const response = await fetch('http://localhost:5050/adminhome', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            if (data.designation == "M") setShow1(true);
            console.log(data);
            if (response.status !== 200) {
                throw new Error(response.error);
            }
        } catch (error) {
            console.log(error);
            history.push('/adminlogin');
        }

    }


    useEffect(() => {
        checkAuthentication();
    }, []);



    return (
        <div className="adminHome">
            <Navbar />
            <br />
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm="5">
                        <Row><Button variant="secondary" size="lg" className="mb-3" onClick={() => setShow(!show)}>PDI Report</Button></Row>

                        {show ? <Row><Button variant="outline-primary" size="lg" className="mb-3" onClick={event => window.location.href = '/searchbydate'}>View Report</Button></Row> : null}
                        {show ? show1 ? <Row><Button variant="outline-primary" size="lg" className="mb-3" onClick={event => window.location.href = '/editreport'}>Edit Report</Button></Row> : null : null}
                        {show ? <Row><Button variant="outline-primary" size="lg" className="mb-3" onClick={event => window.location.href = '/inspection'}>Submit Report</Button></Row> : null}
                        <Row><Button variant="secondary" size="lg" className="mb-3" onClick={event => window.location.href = '/myrework'}>My Rework</Button></Row>

                    </Col>
                </Row>

                <ResponsiveContainer aspect={4 / 2}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>

                <ResponsiveContainer aspect={4 / 2}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </Container>


        </div>


    )
}

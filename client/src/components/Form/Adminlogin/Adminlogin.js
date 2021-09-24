import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Icon from "./Icon";
import "./Login.css";

export default function AdminLogin() {
    const [admin, setUser] = useState({
        empid: "",
        password: ""
    });

    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...admin,
            [name]: value
        });
    }

    const login = () => {
        axios.post('http://localhost:5000/adminlogin', admin, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(res => {
                alert(res.data.message);
                history.push("/adminhome");
            })
            .catch(e => {
                console.log(e);
            })
    }


    return (
        <div className="d-flex align-items-center justify-content-center login-contain" style={{ height: "100vh", backgroundColor: "rgb(237, 240, 243)" }}>
            <div className="login d-flex align-items-center justify-content-center" style={{ height: "60%", flexDirection: "column", width: "50%" }}>
                <Icon />
                <h1>Admin Login</h1>
                <div className="login-form px-5 d-flex justify-content-center" style={{ flexDirection: "column", width: "70%" }}>
                    <label style={{ alignSelf: "flex-start" }} htmlFor="empid">Id</label>
                    <input id="empid" name="empid" type="text" value={admin.empid} onChange={handleChange} />
                    <label className="mt-2" style={{ alignSelf: "flex-start" }} htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={admin.password} onChange={handleChange} />
                    <button onClick={login} className="btn btn-primary mt-3">Login</button>
                </div>
            </div>
        </div>
    )
}

import "./Userlogin.css";
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Icon from "./Icon";

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const login = () => {
        axios.post('http://localhost:5000/userlogin', user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(res => {
                alert(res.data.message);
                history.push("/userhome");
            })
            .catch(e => {
                console.log(e);
            })
    }


    return (
        <div className="d-flex align-items-center justify-content-center login-contain" style={{ height: "100vh", backgroundColor: "rgb(237, 240, 243)" }}>
            <div className="login d-flex align-items-center justify-content-center" style={{ height: "60%", flexDirection: "column", width: "50%" }}>
                <Icon />
                <h1>User Login</h1>
                <div className="login-form px-5 d-flex justify-content-center" style={{ flexDirection: "column", width: "70%" }}>
                    <label style={{ alignSelf: "flex-start" }} htmlFor="email">Email Id</label>
                    <input id="email" name="email" type="email" value={user.email} required onChange={handleChange} />
                    <label className="mt-2" style={{ alignSelf: "flex-start" }} htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={user.password} required onChange={handleChange} />
                    <button onClick={login} className="btn btn-primary mt-3">Login</button>
                </div>
            </div>
        </div>
    )
}


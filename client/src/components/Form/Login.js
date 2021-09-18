import axios from 'axios';
import React , { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export default function Login({ setLoginUser}) {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name] : value
        });
    }

    const login = () => {
        axios.post('http://localhost:5000/login', user)
            .then(res => {
                alert(res.data.message);
                setLoginUser(res.data.user);
                history.push("/");
            })
            .catch(e => {
                console.log(e);
            })
    }


    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh", flexDirection: "column" }}>
            <h1>Login</h1>
            <div style={{ display: "flex", flexDirection: "column", width: "35%" }}>
                <label style={{ alignSelf: "flex-start" }} htmlFor="username">Username</label>
                <input id="username" name="username" type="text" value={user.username} onChange={ handleChange } />
                <label className="mt-2" style={{ alignSelf: "flex-start" }} htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={user.password} onChange={ handleChange } />
                <button onClick={login} className="btn btn-primary mt-3">Login</button>
            </div>
        </div>
    )
}

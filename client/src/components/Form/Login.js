import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        axios.post('http://localhost:3000/login', { username, email, password })
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <form style={{ display: "flex", flexDirection: "column", width: "35%" }}>
                <label style={{ alignSelf: "flex-start" }} htmlFor="username">Username</label>
                <input id="username" name="username" type="text" onChange={e => {
                    setUsername(e.target.value);
                }} />
                <label style={{ alignSelf: "flex-start" }} htmlFor="email">Email</label>
                <input id="email" name="username" type="email" onChange={e => {
                    setEmail(e.target.value);
                }} />
                <label className="mt-2" style={{ alignSelf: "flex-start" }} htmlFor="password">Password</label>
                <input id="password" type="password" onChange={e => {
                    setPassword(e.target.value);
                }} />
                <button onClick={register} className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}

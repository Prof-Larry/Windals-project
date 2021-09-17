import React, { useState, useEffect} from 'react';
import axios from 'axios';

export default function Register() {
    const [user, setUser] = useState({
        username : "",
        email : "",
        password : ""
    });

    //to send the registration request to the backend
    const register = () => {
        axios.post('http://localhost:5000/login', user)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    //to keep track of changes in the input fields
    const handleChange = e => {
        const { name , value } = e.target;
        setUser({
            ...user,
            [name] : value
        });
    }
    //to see realtime change in input fields
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh", flexDirection: "column" }}>
            <h1>Login</h1>
            <form style={{ display: "flex", flexDirection: "column", width: "35%" }}>
                <label style={{ alignSelf: "flex-start" }} htmlFor="username">Username</label>
                <input id="username" name="username" type="text" value={user.username} onChange={ handleChange } />
                <label style={{ alignSelf: "flex-start" }} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={user.email} onChange={ handleChange } />
                <label className="mt-2" style={{ alignSelf: "flex-start" }} htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={user.password} onChange={ handleChange } />
                <button onClick={register} className="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Register() {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        age: "",
        password: "",
        confirmpassword: ""
    });

    //to send the registration request to the backend
    const register = () => {
        axios.post('http://localhost:5000/register', user)
            .then(res => {
                alert(res.data.message);
            })
            .catch(e => {
                console.log(e)
            })
    }

    //to keep track of changes in the input fields
    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const intChange = e => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: parseInt(value)
        });
    }
    //to see realtime change in input fields
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh", flexDirection: "column" }}>
            <h1>Register</h1>
            <div style={{ display: "flex", flexDirection: "column", width: "35%" }}>
                <label style={{ alignSelf: "flex-start" }} htmlFor="firstname">Firstname</label>
                <input id="firstname" name="firstname" type="text" value={user.firstname} onChange={handleChange} />

                <label style={{ alignSelf: "flex-start" }} htmlFor="lastname">Lastname</label>
                <input id="lastname" name="lastname" type="text" value={user.lastname} onChange={handleChange} />

                <label style={{ alignSelf: "flex-start" }} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={user.email} onChange={handleChange} />

                <label style={{ alignSelf: "flex-start" }} htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="text" value={user.phone} onChange={intChange} />

                <label style={{ alignSelf: "flex-start" }} htmlFor="age">age</label>
                <input id="age" name="age" type="text" value={user.age} onChange={intChange} />

                <label style={{ alignSelf: "flex-start" }} htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={user.password} onChange={handleChange} />

                <label className="mt-2" style={{ alignSelf: "flex-start" }} htmlFor="confirmpassword">confirmpassword</label>
                <input id="confirmpassword" type="password" name="confirmpassword" value={user.confirmpassword} onChange={handleChange} />
                <button onClick={register} className="btn btn-primary mt-3">Register</button>
            </div>
        </div>
    )
}

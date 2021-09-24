import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css'


/* ALERT ---------------------         Still i need to add the Route to Master home page         -----------------------ALERT */

export default function Register() {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        empid: "",
        department: "",
        email: "",
        phone: "",
        age: "",
        password: "",
        confirmpassword: ""
    });

    //to send the registration request to the backend
    const register = () => {
        axios.post('http://localhost:5000/adminregister', user)
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
        <div className="register d-flex align-items-center justify-content-center" style={{ height: "100vh", flexDirection: "column" }}>
            <div className="register-form">
                <h1 className="" style={{}}>Employee Registration</h1>
                <div className="group-1">
                    <label style={{}} htmlFor="firstname">Firstname</label>
                    <input className="firstname" id="firstname" name="firstname" type="text" value={user.firstname} onChange={handleChange} />
                </div>

                <div className="group-1">
                    <label style={{}} htmlFor="lastname">Lastname</label>
                    <input className="lastname" id="lastname" name="lastname" type="text" value={user.lastname} onChange={handleChange} />
                </div>

                <div className="group-1">
                    <label htmlFor="empid">Employee id</label>
                    <input type="text" className="empid" id="empid" name="empid" value={user.empid} onChange={handleChange} />
                </div>

                <div className="group-1">
                    <label htmlFor="department">Department</label>
                    <input type="text" className="department" id="department" name="department" value={user.department} onChange={handleChange} />
                </div>

                <label style={{ alignSelf: "flex-start" }} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={user.email} onChange={handleChange} />

                <div className="group-1">
                    <label style={{ alignSelf: "flex-start" }} htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="text" value={user.phone} onChange={intChange} />
                </div>

                <div className="group-1">
                    <label style={{ alignSelf: "flex-start" }} htmlFor="age">Age</label>
                    <input id="age" name="age" type="text" value={user.age} onChange={intChange} />
                </div>

                <div className="group-1">
                    <label style={{ alignSelf: "flex-start" }} htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={user.password} onChange={handleChange} />
                </div>

                <div className="group-1">            
                    <label style={{ alignSelf: "flex-start" }} htmlFor="confirmpassword">Confirmpassword</label>
                    <input id="confirmpassword" type="password" name="confirmpassword" value={user.confirmpassword} onChange={handleChange} />
                </div>

                <button onClick={register} className="btn btn-success mt-3 rounded">Register</button>
            </div>
        </div>
    )
}

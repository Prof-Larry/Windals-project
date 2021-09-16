import React from 'react';

export default function Login() {
    return (
        <div className="container d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <form style={{display:"flex", flexDirection: "column", width: "35%"}} action="">
                <label style={{alignSelf: "flex-start"}} htmlFor="email">Email</label>
                <input id="email" type="email" />
                <label className="mt-2" style={{alignSelf: "flex-start"}} htmlFor="password">Password</label>
                <input id="password" type="password" />
                <button className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
export default function Navbar() {
    return (
        <div className="navbar">
            <h2>WINDALS</h2>
            <div className="navigation">
                <Link to="/userlogin" className="userlink">User</Link>
                <Link to="/adminlogin" className="adminlink">Admin</Link>
                <Link to="/masterlogin" className="masterlink">Master</Link>
            </div>
        </div>
    )
}

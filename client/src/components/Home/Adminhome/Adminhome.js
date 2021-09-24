import React from 'react';
import Navbar from '../../Navbar/Navbar';
import { useEffect } from 'react';
import "./Adminhome.css";
import { useHistory } from 'react-router';

export default function Adminhome() {
    const history = useHistory();
    // useEffect(() => {
    //     function gotoLogin(){
    //         // const admin = localStorage.getItem("admin");
    //         if(!admin){
    //             history.push("/adminlogin");
    //         }
    //     }
    //     gotoLogin();
    // }, []);


    return (
        <div className="adminHome">
            <Navbar />
            <h1>This will be admin page</h1>
        </div>
    )
}

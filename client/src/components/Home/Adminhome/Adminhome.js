import React from 'react';
import { useEffect } from 'react';
import "./Adminhome.css";
import { useHistory } from 'react-router';
import axios from "axios";

export default function Adminhome() {
    const history = useHistory();
    const checkAuthentication = async () => {
        // const response = await axios.get('http://localhost:5000/adminhome', {
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     withCredentials: true
        // });
        // const data = response.data;
        // console.log(data);

        // if (!response.status === 200) {
        //     alert(response.message)
        //     history.push("/adminlogin");
        // }
        try {
            const response = await fetch('http://localhost:5000/adminhome', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);
            if (!response.status === 200) {
                throw new Error(response.error);
            }
        } catch (error) {
            console.log(error);
            history.push('/adminlogin');
        }

    }


    useEffect(() => {
        checkAuthentication();
    }, []);


    return (
        <div className="adminHome">
            <h1>This will be admin page</h1>
        </div>
    )
}

import React from "react";
import { useEffect, useState } from "react";
import "./Adminhome.css";
import { useHistory } from "react-router";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavbarAdmin from "../../Navbar/NavbarAdminHome";
import NavbarMaster from "../../Navbar/NavbarMasterHome";
import Dashboard from "../../Dashboard/Dashboard";


export default function Adminhome() {

  const [showAdmin, setShowAdmin] = useState(false);
  const [showMaster, setShowMaster] = useState(false);


  const history = useHistory();
  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5050/adminhome", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      data.designation === "M" ? setShowMaster(true): setShowAdmin(true)
      
      console.log(data);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      history.push("/adminlogin");
    }
  };

  
  useEffect(() => {
    checkAuthentication();
  }, []);


  return (
    <div className="adminHome">
      {showAdmin ? (<NavbarAdmin />) : null}
      {showMaster ? (<NavbarMaster/>) : null}
      <br/>
      <Dashboard/>
      
    </div>
  );
}

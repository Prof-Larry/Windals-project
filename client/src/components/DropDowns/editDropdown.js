import React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col ,Nav} from "react-bootstrap";
import NavbarMaster from "../Navbar/NavbarMasterHome";
import Inspection from "../DropDowns/inspectionDropdown";
import Rework from "../DropDowns/reworkDropdown";
import Rejection from "../DropDowns/rejectionDropdown";

export default function editDropdown() {

  
  
    return (
      <div className="editDropdown">
        <Container>
            <NavbarMaster/>

            <Nav variant="tabs" className="justify-content-md-center">
                <Nav.Item>
                    <Nav.Link >Inspection Dropdowns</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link >Rework Dropdowns</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link >Rejection Dropdowns</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <hr/>
            <Inspection/>
            <hr/>
            <Rework/>
            <hr/>
            <Rejection/>
          

        
        </Container>
      </div>
    );
  }
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Modal, Button } from "react-bootstrap";
import Icon from "./Icon";
import "./Login.css";
import serverUrl from "../../../api/index";

export default function AdminLogin() {
  const [admin, setUser] = useState({
    empid: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...admin,
      [name]: value,
    });
  };

  const login = () => {
    axios.defaults.withCredentials = true;
    axios
      .post(`${serverUrl}/adminlogin`, admin, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.code) {
          history.push("/adminhome");
        } else {
          setMessage(res.data.message);
          setShow(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  const checkAuthorization = async () => {
    try {
      const response = await fetch(`${serverUrl}/report/reportAuthorization`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.token) {
        history.push("/adminhome");
      }
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      history.push("/adminlogin");
    }
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center login-contain"
      style={{ height: "100vh", backgroundColor: "rgb(237, 240, 243)" }}
    >
      <div
        className="login d-flex align-items-center justify-content-center"
        style={{ height: "60%", flexDirection: "column", width: "50%" }}
      >
        <Icon />
        <h1>Admin Login</h1>
        <div
          className="login-form px-5 d-flex justify-content-center"
          style={{ flexDirection: "column", width: "70%" }}
        >
          <label style={{ alignSelf: "flex-start" }} htmlFor="empid">
            Id
          </label>
          <input
            id="empid"
            name="empid"
            type="text"
            value={admin.empid}
            onChange={handleChange}
            placeholder="EX00000"
          />
          <label
            className="mt-2"
            style={{ alignSelf: "flex-start" }}
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
          />
          <button onClick={login} className="btn btn-primary mt-3">
            Login
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

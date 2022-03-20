import React from "react";
import { useEffect } from "react";
import "./Adminhome.css";
import { useHistory } from "react-router";
import serverUrl from "../../../api/index";

export default function Masterhome() {
  const history = useHistory();
  const checkAuthentication = async () => {
    try {
      const response = await fetch(`${serverUrl}/adminhome`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      if (!response.status === 200) {
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
      <h1>This will be admin page</h1>
    </div>
  );
}

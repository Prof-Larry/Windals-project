import axios from "axios";
import React from "react";
import Navbar from "../Navbar/Navbar";
import serverUrl from "../../api/index";

export default function Home() {
  console.log(serverUrl);
  const handleTest = async () => {
    try {
      const response = await fetch("https://pdi-server.herokuapp.com/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log(data);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <button onClick={handleTest}>Test</button>
    </div>
  );
}

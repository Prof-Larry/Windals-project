import axios from "axios";
import React from "react";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  const handleTest = () => {
    axios
      .get("https://pdi-server.herokuapp.com/test")
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navbar />
      <button onClick={handleTest}>Test</button>
    </div>
  );
}

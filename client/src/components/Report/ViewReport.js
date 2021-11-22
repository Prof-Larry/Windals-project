import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

export default function ViewReport() {
  const history = useHistory;

  const checkAuthorization = async () => {
    try {
      const response = await fetch(
        "http://localhost:5050/report/reportAuthorization",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
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
    checkAuthorization();
  }, []);
  return (
    <div className="ViewReport">
      <h2>View report</h2>
      <Button
        variant="secondary"
        size="lg"
        className="mb-3"
        onClick={(event) => (window.location.href = "/searchbydate")}
      >
        search by date
      </Button>
    </div>
  );
}

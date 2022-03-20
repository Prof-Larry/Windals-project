import "./App.css";
import React, { useState } from "react";
import Register from "./components/Form/Adminlogin/Register";
import AdminLogin from "./components/Form/Adminlogin/Adminlogin";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Userlogin from "./components/Form/Userlogin/Userlogin";
import Masterlogin from "./components/Form/Masterlogin/Masterlogin";
import Adminhome from "./components/Home/Adminhome/Adminhome";
import SubmitReport from "./components/Report/SubmitReport";
import EditReport from "./components/Report/EditReport";
import InspectionDetails from "./components/Details/InspectionDetails";
import ReworkDetails from "./components/Details/ReworkDetails";
import RejectionDetails from "./components/Details/RejectionDetails";
import MyRework from "./components/Details/MyRework";
import SearchByDate from "./components/Report/ViewReport/SearchBydate";
import ReportsTable from "./components/Report/ViewReport/Reportstable";
import ShowReport from "./components/Report/ViewReport/ShowReport";
import ReworkToDo from "./components/Details/ReworkToDo";
import EditDropdown from "./components/DropDowns/editDropdown";
import serverUrl from "./api/index";
import axios from "axios";

const getInspectionDetails = () => {
  let ins_details = JSON.parse(sessionStorage.getItem("inspection"));

  if (ins_details) {
    return ins_details;
  }
  return {
    plant_code: "",
    production_line: "",
    product_number: "",
    product_name: "",
  };
};

const getReworkDetails = () => {
  let reworkDetails = JSON.parse(sessionStorage.getItem("rework_details"));
  if (reworkDetails) {
    return reworkDetails;
  }
  return {
    rework_type: "",
    process_name: "",
    process_quantity: "",
  };
};

const getRejectionDetails = () => {
  let rej_report = JSON.parse(sessionStorage.getItem("rejection_details"));

  if (rej_report) {
    return rej_report;
  }
  return {
    rejection_name: "",
    rejection_quantity: "",
  };
};

const getReworkDefects = () => {
  let rework_defects = JSON.parse(sessionStorage.getItem("rework_defects"));
  if (rework_defects) {
    return rework_defects;
  }
  return [
    {
      rework_defect: "",
      rework_defect_quantity: "",
      rework_defect_location: "",
      rework_category_defect: "",
      rework_defect_details: "",
      rework_rework_status: "",
      rework_rework_details: "",
      rework_rework_handler: "",
    },
  ];
};

const getRejectionDefects = () => {
  let rej_defect = JSON.parse(sessionStorage.getItem("rejection_defects"));
  if (rej_defect) {
    return rej_defect;
  }
  return [
    {
      rejection_defect_quantity: "",
      rejection_defect: "",
      rejection_defect_location: "",
      rejection_category_defect: "",
      rejection_defect_details: "",
      rejection_rework_status: "",
      rejection_rework_details: "",
      rejection_rework_handler: "",
    },
  ];
};

const getDefects = () => {
  const defects = JSON.parse(sessionStorage.getItem("defects"));
  if (defects) {
    return defects;
  }
  return [];
};

const getRejDefects = () => {
  const defects = JSON.parse(sessionStorage.getItem("defects_rej"));
  if (defects) {
    return defects;
  }
  return [];
};

const getLocation = () => {
  return [
    "AA",
    "AB",
    "AC",
    "AD",
    "AE",
    "AF",
    "AG",
    "AH",
    "AI",
    "AJ",
    "AK",
    "AL",
    "AM",
    "AN",
    "AO",
    "AP",
    "AQ",
    "AR",
    "AS",
    "AT",
    "AU",
    "AW",
    "AX",
    "AY",
    "AZ",
  ];
};

const getRejLocation = () => {
  const location = JSON.parse(sessionStorage.getItem("location_rej"));
  if (location) {
    return location;
  }
  return [];
};

function App() {
  let [inspection, setInspection] = useState(getInspectionDetails());

  let [reworkDetails, setReworkDetails] = useState(getReworkDetails());

  let [reworkDefects, setReworkDefects] = useState(getReworkDefects());

  let [defects, setDefects] = useState(getDefects());

  let [rej_defects, setRejDefects] = useState(getRejDefects());

  let [rejectionRework, setRejectionRework] = useState(getRejectionDetails());

  let [rejectionDefects, setRejectionDefects] = useState(getRejectionDefects());

  let [location, setLocation] = useState(getLocation());

  const addReworkDefects = (e, index) => {
    const { name, value } = e.target;

    if (name == "rework_category_defect") {
      axios
        .post(
          `${serverUrl}/report/getDefects`,
          { category_name: value },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "JWT fefege...",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          const defects_arr = res.data[0].defects.map((d) => d.defect);
          setDefects(defects_arr);
          sessionStorage.setItem("defects", JSON.stringify(defects_arr));
        })
        .catch((e) => {
          alert("Some technical Error, please try again later");
        });
    }
    // if (name == "rework_defect") {
    //   axios
    //     .post(
    //       `${serverUrl}/report/getLocation`,
    //       { defect_name: value },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: "JWT fefege...",
    //         },
    //         withCredentials: true,
    //       }
    //     )
    //     .then((res) => {
    //       const location = res.data[0].location.map((l) => l.loc);
    //       setLocation(location);
    //       sessionStorage.setItem("location", JSON.stringify(location));
    //       console.log(res.data);
    //     })
    //     .catch((e) => {
    //       alert("Some technical Error, please try again later");
    //     });
    // }
    const list = [...reworkDefects];
    list[index][name] = value;
    setReworkDefects(list);
  };

  const addRejDefects = (e, index) => {
    const { name, value } = e.target;
    if (name == "rejection_category_defect") {
      axios
        .post(
          `${serverUrl}/report/getDefects`,
          { category_name: value },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "JWT fefege...",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          const defects_arr = res.data[0].defects.map((d) => d.defect);
          setRejDefects(defects_arr);
          sessionStorage.setItem("defects_rej", JSON.stringify(defects_arr));
        })
        .catch((e) => {
          alert("Some technical Error, please try again later");
        });
    }
    // if (name == "rejection_defect") {
    //   axios
    //     .post(
    //       `${serverUrl}/report/getLocation`,
    //       { defect_name: value },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: "JWT fefege...",
    //         },
    //         withCredentials: true,
    //       }
    //     )
    //     .then((res) => {
    //       const location = res.data[0].location.map((l) => l.loc);
    //       setRejLocation(location);
    //       sessionStorage.setItem("location_rej", JSON.stringify(location));
    //     })
    //     .catch((e) => {
    //       alert("Some technical Error, please try again later");
    //     });
    // }
    const list = [...rejectionDefects];
    list[index][name] = value;
    setRejectionDefects(list);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* {user && user._id ? <Home /> : <Login setLoginUser={setLoginUser} />} */}
          <Home />
        </Route>
        <Route exact path="/userlogin">
          <Userlogin />
        </Route>
        <Route exact path="/adminlogin">
          <AdminLogin />
        </Route>
        <Route exact path="/masterlogin">
          <Masterlogin />
        </Route>
        <Route exact path="/adminregister">
          <Register></Register>
        </Route>
        <Route exact path="/adminhome">
          <Adminhome />
        </Route>

        <Route exact path="/submitreport">
          <SubmitReport />
        </Route>
        <Route exact path="/editreport">
          <EditReport />
        </Route>

        <Route exact path="/inspection">
          <InspectionDetails
            inspection={inspection}
            setInspection={setInspection}
          />
        </Route>
        <Route exact path="/rework">
          <ReworkDetails
            reworkDetails={reworkDetails}
            setReworkDetails={setReworkDetails}
            reworkDefects={reworkDefects}
            setReworkDefects={setReworkDefects}
            addReworkDefects={addReworkDefects}
            defects={defects}
            location={location}
          />
        </Route>
        <Route exact path="/rejection">
          <RejectionDetails
            rejectionRework={rejectionRework}
            setRejectionRework={setRejectionRework}
            rejectionDefects={rejectionDefects}
            setRejectionDefects={setRejectionDefects}
            addRejDefects={addRejDefects}
            rejDefects={rej_defects}
            rejlocation={location}
          />
        </Route>
        <Route exact path="/myrework">
          <MyRework />
        </Route>
        <Route exact path="/searchbydate">
          <SearchByDate />
        </Route>
        <Route exact path="/reportstable">
          <ReportsTable />
        </Route>
        <Route exact path="/showreport">
          <ShowReport />
        </Route>
        <Route exact path="/reworktodo">
          <ReworkToDo />
        </Route>

        <Route exact path="/editdropdown">
          <EditDropdown />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

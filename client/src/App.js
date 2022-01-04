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

const getInspectionDetails = () => {
  let ins_details = JSON.parse(sessionStorage.getItem("inspection"));

  if (ins_details) {
    return ins_details;
  }
  return {
    plant_code: "",
    production_line: "",
    product_number: "",
    product_name: ""
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
    process_quantity: ""
  }
}

const getInpRejectionItems = () => {
  let rej_report = JSON.parse(localStorage.getItem("rej_report"));

  if (rej_report) {
    return rej_report;
  }
  return {
    rejection_name: "",
    rejection_total_quantity: "",
    rejection_total_defective_quantity: "",
  };
};

const getReworkDefects = () => {
  let rework_defects = JSON.parse(localStorage.getItem("rework_defects"));
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

const getInpRejectionDefect = () => {
  let rej_defect = JSON.parse(localStorage.getItem("rej_defect"));
  if (rej_defect) {
    return rej_defect;
  }
  return [
    {
      rej_defect_quantity: "",
      rej_defect: "",
      rej_defect_location: "",
      rej_category_defect: "",
      rej_defect_details: "",
      rej_rework_status: "",
      rej_rework_details: "",
      rej_rework_handler: "",
    },
  ];
};







function App() {
  let [inspection, setInspection] = useState(getInspectionDetails());

  let [reworkDetails, setReworkDetails] = useState(getReworkDetails());

  let [reworkDefects, setReworkDefects] = useState(getReworkDefects());

  let [rejectionRework, setRejectionRework] = useState(getInpRejectionItems());

  let [rej_defects, setRejDefects] = useState(getInpRejectionDefect());


  const addReworkDefects = (e, index) => {
    const { name, value } = e.target;
    const list = [...reworkDefects];
    list[index][name] = value;
    setReworkDefects(list);
  };

  const addRejDefects = (e, index) => {
    const { name, value } = e.target;
    const list = [...rej_defects];
    list[index][name] = value;
    setRejDefects(list);
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
          />
        </Route>
        <Route exact path="/rejection">
          <RejectionDetails
            rejectionRework={rejectionRework}
            setRejectionRework={setRejectionRework}
            rej_defects={rej_defects}
            setRejDefects={setRejDefects}
            addRejDefects={addRejDefects}
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

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

const getInspectionDetails = () => {
  let ins_details = JSON.parse(localStorage.getItem("inspection"));

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

const getInprocessItems = () => {
  let inp_report = JSON.parse(localStorage.getItem("inp_report"));

  if (inp_report) {
    return inp_report;
  }
  return {
    inprocess_name: "",
    inprocess_total_quantity: "",
    inprocess_total_defective_quantity: "",
  };
};

const getPdiItems = () => {
  let pdi_details = JSON.parse(localStorage.getItem("pdi_report"));

  if (pdi_details) {
    return pdi_details;
  }
  return {
    pdi_name: "",
    pdi_total_quantity: "",
    pdi_total_defective_quantity: "",
  };
};

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

const getInpDefect = () => {
  let inpro_defect = JSON.parse(localStorage.getItem("inpro_defect"));
  if (inpro_defect) {
    return inpro_defect;
  }
  return [
    {
      inprocess_defect_quantity: "",
      inprocess_defect: "",
      inprocess_defect_location: "",
      inprocess_category_defect: "",
      inprocess_defect_details: "",
      inprocess_rework_status: "",
      inprocess_rework_details: "",
      inprocess_rework_handler: "",
    },
  ];
};

const getPdiDefect = () => {
  let pdi_defect = JSON.parse(localStorage.getItem("pdi_defect"));
  if (pdi_defect) {
    return pdi_defect;
  }
  return [
    {
      pdi_defect_quantity: "",
      pdi_defect: "",
      pdi_defect_location: "",
      pdi_category_defect: "",
      pdi_defect_details: "",
      pdi_rework_status: "",
      pdi_rework_details: "",
      pdi_rework_handler: "",
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

  let [inprocessRework, setInprocessRework] = useState(getInprocessItems());

  let [inprocess_defects, setInprocessDefects] = useState(getInpDefect());

  let [pdiRework, setPdiRework] = useState(getPdiItems());

  let [pdi_defects, setPdiDefects] = useState(getPdiDefect());

  let [rejectionRework, setRejectionRework] = useState(getInpRejectionItems());

  let [rej_defects, setRejDefects] = useState(getInpRejectionDefect());

  const addInpDefects = (e, index) => {
    const { name, value } = e.target;
    const list = [...inprocess_defects];
    list[index][name] = value;
    setInprocessDefects(list);
  };

  const addPdiDefects = (e, index) => {
    const { name, value } = e.target;
    const list = [...pdi_defects];
    list[index][name] = value;
    setPdiDefects(list);
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
            inprocessRework={inprocessRework}
            setInprocessRework={setInprocessRework}
            inprocess_defects={inprocess_defects}
            setInprocessDefects={setInprocessDefects}
            addInpDefects={addInpDefects}
            pdiRework={pdiRework}
            setPdiRework={setPdiRework}
            pdi_defects={pdi_defects}
            setPdiDefects={setPdiDefects}
            addPdiDefects={addPdiDefects}
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
        <Route exact path="/reworktode">
          <ReworkToDo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import './App.css';
import React, { useState, useEffect } from 'react'
import Register from './components/Form/Adminlogin/Register';
import AdminLogin from './components/Form/Adminlogin/Adminlogin';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Userlogin from './components/Form/Userlogin/Userlogin';
import Masterlogin from './components/Form/Masterlogin/Masterlogin';
import Adminhome from './components/Home/Adminhome/Adminhome';
import ViewReport from './components/Report/ViewReport';
import SubmitReport from './components/Report/SubmitReport';
import EditReport from './components/Report/EditReport';
import InspectionDetails from './components/Details/InspectionDetails';
import ReworkDetails from './components/Details/ReworkDetails';
import RejectionDetails from './components/Details/RejectionDetails';


const getInspectionDetails = () => {
  let ins_details = JSON.parse(localStorage.getItem('Inspection'));

  if (ins_details) {
    return ins_details;
  }
  return {
    plant_code: "",
    production_line: "",
    product_number: "",
    product_name: ""
  }
}


const getInprocessItems = () => {
  let inp_report = JSON.parse(localStorage.getItem('inp_report'));

  if (inp_report) {
    return inp_report;
  }
  return {
    inprocess_name: "",
    inprocess_total_quantity: "",
    inprocess_total_defective_quantity: "",
    inprocess_total_defects: []
  };
}

const getInpDefect = () => {
  let inpro_defect = JSON.parse(localStorage.getItem('inpro_defect'));
  if (inpro_defect) {
    return inpro_defect;
  }
  return [{
    inprocess_defect_quantity: "",
    inprocess_defect: "",
    inprocess_defect_location: "",
    inprocess_category_defect: "",
    inprocess_defect_details: "",
    inprocess_rework_status: "",
    inprocess_rework_details: "",
    inprocess_defect_handler: ""
  }];
}

const getPdiItems = () => {
  let pdi_details = JSON.parse(localStorage.getItem('pdi_report'));

  if (pdi_details) {
    return pdi_details;
  }
  return {
    pdi_name: "",
    pdi_total_quantity: "",
    pdi_total_defective_quantity: "",
    pdi_total_defects: []
  }
}

const getPdiDefect = () => {
  let pdi_defect = JSON.parse(localStorage.getItem('pdi_defect'));

  if (pdi_defect) {
    return pdi_defect;
  }
  return [{
    pdi_defect_quantity: "",
    pdi_defect: "",
    pdi_defect_location: "",
    pdi_category_defect: "",
    pdi_details: "",
    pdi_rework_status: "",
    pdi_rework_details: "",
    pdi_defect_handler: ""
  }];
}

function App() {
  // ----------------------------------INPROCESS REWORK VARIABLES----------------------------------//

  let [inspection, setInspection] = useState(getInspectionDetails());

  let [inprocessRework, setInprocessRework] = useState(getInprocessItems());

  let [inprocess_defects, setInprocessDefects] = useState(getInpDefect());

  // let [inp_defect, setInpDefect] = useState(getInpDefect());

  let [pdiRework, setPdiRework] = useState(getPdiItems());

  let [pdi_defects, setPdiDefects] = useState(getPdiDefect());

  // let [pd_defect, setPdDefect] = useState(getPdiDefect());

  useEffect(() => {
    console.log(inprocess_defects);
    console.log(inprocessRework);
  }, [inprocess_defects]);



  const addInpDefects = (e, index) => {
    const { name, value } = e.target;
    const list = [...inprocess_defects];
    list[name][index] = value;
    setInprocessDefects(list);
    // inp_defect = { ...inp_defect, inprocess_defect_id: inprocess_defect_id };
    // const total_defective_products = inprocessRework.inprocess_total_defective_quantity + inp_defect.inprocess_defect_quantity;
    // setInprocessDefects([...inprocess_defects, inp_defect]);
    // setInprocessRework({ ...inprocessRework, inprocess_total_defective_quantity: total_defective_products, inprocess_total_defects: [...inprocess_defects] });
    // console.log(inprocessRework)
  }



  const updateInprocessTotalQuantity = (e) => {
    const { name, value } = e.target;
    setInprocessRework({ ...inprocessRework, [name]: parseInt(value) });
  }

  // const updateInprocessDefectQantity = (e) => {
  //   const { name, value } = e.target;
  //   setInpDefect({ ...inp_defect, [name]: parseInt(value) });
  // }
  // ----------------------------------INPROCESS REWORK VARIABLES----------------------------------//
  // ----------------------------------PDI REWORK VARIABLES----------------------------------------//

  useEffect(() => {
    console.log(pdi_defects);
    console.log(pdiRework);
    setPdiRework({ ...pdiRework, pdi_total_defects: pdi_defects });
  }, [pdi_defects]);



  const addPdiDefects = (e, index) => {
    const { name, value } = e.target;
    const list = [...pdi_defects];
    list[name][index] = value;
    setPdiDefects(list);
    //   const pdi_defect_id = Date.now().toString();
    //   pd_defect = { ...pd_defect, pdi_defect_id: pdi_defect_id };
    //   const total_defective_products = pdiRework.pdi_total_defective_quantity + pd_defect.pdi_defect_quantity;
    //   setPdiDefects([...pdi_defects, pd_defect]);
    //   setPdiRework({ ...pdiRework, pdi_total_defective_quantity: total_defective_products, pdi_total_defects: pdi_defects });
  }

  const updatePdiTotalQuantity = (e) => {
    const { name, value } = e.target;
    setPdiRework({ ...pdiRework, [name]: parseInt(value) });
  }

  // const updatePdiDefectQantity = (e) => {
  //   const { name, value } = e.target;
  //   setPdDefect({ ...pd_defect, [name]: parseInt(value) });
  // }
  // ----------------------------------PDI REWORK VARIABLES----------------------------------//


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

        <Route exact path="/viewreport">
          <ViewReport />
        </Route>
        <Route exact path="/submitreport">
          <SubmitReport />
        </Route>
        <Route exact path="/editreport">
          <EditReport />
        </Route>

        <Route exact path="/inspection">
          <InspectionDetails inspection={inspection} setInspection={setInspection} />
        </Route>
        <Route exact path="/rework">
          <ReworkDetails
            inprocessRework={inprocessRework}
            setInprocessRework={setInprocessRework}
            inprocess_defects={inprocess_defects}
            setInprocessDefects={setInprocessDefects}
            addInpDefects={addInpDefects}
            updateInprocessTotalQuantity={updateInprocessTotalQuantity}
            pdiRework={pdiRework}
            setPdiRework={setPdiRework}
            pdi_defects={pdi_defects}
            setPdiDefects={setPdiDefects}
            addPdiDefects={addPdiDefects}
            updatePdiTotalQuantity={updatePdiTotalQuantity} />
        </Route>
        <Route exact path="/rejection">
          <RejectionDetails />
        </Route>


      </Switch>
    </Router>
  );
}

export default App;

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

function App() {
  const [inspection, setInspection] = useState({
    plant_code: "",
    production_line: "",
    product_number: "",
    product_name: "",
  });

  const [inprocessRework, setInprocessRework] = useState({
    inprocess_name: "",
    inprocess_total_quantity: "",
    inprocess_total_defective_quantity: "",
    inprocess_total_defects: []
  });

  const [inprocess_defects, setInprocessDefects] = useState([]);

  const [defect, setDefect] = useState({
    inprocess_defect_quantity: "",
    inprocess_defect: "",
    inprocess_defect_location: "",
    inprocess_category_defect: "",
    inprocess_details: "",
  });

  useEffect(() => {
    console.log(inprocess_defects);
    console.log(inprocessRework);
    setInprocessRework({ ...inprocessRework, inprocess_total_defects: inprocess_defects });
  }, [inprocess_defects]);



  const addDefects = () => {
    const inprocess_defect_id = Date.now().toString();
    defect = { ...defect, inprocess_defect_id: inprocess_defect_id };
    const total_defective_products = inprocessRework.inprocess_total_defective_quantity + defect.inprocess_defect_quantity;
    setInprocessDefects([...inprocess_defects, defect]);
    setInprocessRework({ ...inprocessRework, inprocess_total_defective_quantity: total_defective_products });
  }

  const updateTotalQuantity = (e) => {
    const { name, value } = e.target;
    setInprocessRework(...inprocessRework, [name] = parseInt(value));
  }

  const updateDefectQantity = (e) => {
    const { name, value } = e.target;
    setDefect(...defect, [name] = parseInt(value));
  }

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
          <InspectionDetails />
        </Route>
        <Route exact path="/rework">
          <ReworkDetails />
        </Route>
        <Route exact path="/rejection">
          <RejectionDetails />
        </Route>


      </Switch>
    </Router>
  );
}

export default App;

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

const getLocalItems = () => {
  let imp_rework = JSON.parse(localStorage.getItem('report'));

  if (imp_rework) {
    return imp_rework;
  }
  return {
    inprocess_name: "",
    inprocess_total_quantity: "",
    inprocess_total_defective_quantity: "",
    inprocess_total_defects: []
  };
}

const getDefects = () => {
  let imp_defects = JSON.parse(localStorage.getItem('defect'));

  if (imp_defects) {
    return imp_defects;
  }
  return {
    inprocess_defect_quantity: "",
    inprocess_defect: "",
    inprocess_defect_location: "",
    inprocess_category_defect: "",
    inprocess_defect_details: "",
    inprocess_rework_status: "",
    inprocess_rework_details: "",
    inprocess_defect_handler: ""
  }

}

function App() {
  // ----------------------------------INPROCESS REWORK VARIABLES----------------------------------//

  const [inspection, setInspection] = useState({
    plant_code: "",
    production_line: "",
    product_number: "",
    product_name: "",
  });

  const [inprocessRework, setInprocessRework] = useState(getLocalItems());

  const [inprocess_defects, setInprocessDefects] = useState([]);

  let [inp_defect, setInpDefect] = useState(getDefects());

  useEffect(() => {
    console.log(inprocess_defects);
    console.log(inprocessRework);
  }, [inprocess_defects]);



  const addInpDefects = () => {
    const inprocess_defect_id = Date.now().toString();
    inp_defect = { ...inp_defect, inprocess_defect_id: inprocess_defect_id };
    const total_defective_products = inprocessRework.inprocess_total_defective_quantity + inp_defect.inprocess_defect_quantity;
    setInprocessDefects([...inprocess_defects, inp_defect]);
    setInprocessRework({ ...inprocessRework, inprocess_total_defective_quantity: total_defective_products, inprocess_total_defects: [...inprocess_defects] });
    console.log(inprocessRework)
  }



  const updateInprocessTotalQuantity = (e) => {
    const { name, value } = e.target;
    setInprocessRework({ ...inprocessRework, [name]: parseInt(value) });
  }

  const updateInprocessDefectQantity = (e) => {
    const { name, value } = e.target;
    setInpDefect({ ...inp_defect, [name]: parseInt(value) });
  }
  // ----------------------------------INPROCESS REWORK VARIABLES----------------------------------//
  // ----------------------------------PDI REWORK VARIABLES----------------------------------------//


  const [pdiRework, setPdiRework] = useState({
    pdi_name: "",
    pdi_total_quantity: "",
    pdi_total_defective_quantity: "",
    pdi_total_defects: []
  });

  const [pdi_defects, setPdiDefects] = useState([]);

  const [pd_defect, setPdDefect] = useState({
    pdi_defect_quantity: "",
    pdi_defect: "",
    pdi_defect_location: "",
    pdi_category_defect: "",
    pdi_details: "",
    pdi_rework_status: "",
    pdi_rework_details: "",
    pdi_defect_handler: ""
  });

  useEffect(() => {
    console.log(pdi_defects);
    console.log(pdiRework);
    setPdiRework({ ...pdiRework, pdi_total_defects: pdi_defects });
  }, [pdi_defects]);



  const addPdiDefects = () => {
    const pdi_defect_id = Date.now().toString();
    pd_defect = { ...pd_defect, pdi_defect_id: pdi_defect_id };
    const total_defective_products = pdiRework.pdi_total_defective_quantity + pd_defect.pdi_defect_quantity;
    setPdiDefects([...pdi_defects, pd_defect]);
    setPdiRework({ ...pdiRework, pdi_total_defective_quantity: total_defective_products, pdi_total_defects: pdi_defects });
  }

  const updatePdiTotalQuantity = (e) => {
    const { name, value } = e.target;
    setPdiRework(...pdiRework, [name] = parseInt(value));
  }

  const updatePdiDefectQantity = (e) => {
    const { name, value } = e.target;
    setPdDefect(...pd_defect, [name] = parseInt(value));
  }
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
            inp_defect={inp_defect}
            setInpDefect={setInpDefect}
            addInpDefects={addInpDefects}
            updateInprocessDefectQantity={updateInprocessDefectQantity}
            updateInprocessTotalQuantity={updateInprocessTotalQuantity}
            pdiRework={pdiRework}
            setPdiRework={setPdiRework}
            pdi_defects={pdi_defects}
            setPdiDefects={setPdiDefects}
            pd_defect={pd_defect}
            setPdDefect={setPdDefect}
            addPdiDefects={addPdiDefects}
            updatePdiTotalQuantity={updatePdiTotalQuantity}
            updatePdiDefectQantity={updatePdiDefectQantity} />
        </Route>
        <Route exact path="/rejection">
          <RejectionDetails />
        </Route>


      </Switch>
    </Router>
  );
}

export default App;

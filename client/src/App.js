import './App.css';
import React from 'react'
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
import ProductionDetails from './components/Details/ProductionDetails';
import ProductDetails from './components/Details/ProductDetails';
import ReworkDetails from './components/Details/ReworkDetails';
import RejectionDetails from './components/Details/RejectionDetails';

function App() {
  // const [user, setLoginUser] = useState({});

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
          <SubmitReport/>
        </Route>
        <Route exact path="/editreport">
          <EditReport />
        </Route>

        <Route exact path="/inspection">
          <InspectionDetails />
        </Route>
        <Route exact path="/production">
          <ProductionDetails />
        </Route>
        <Route exact path="/product">
          <ProductDetails/>
        </Route>
        <Route exact path="/rework">
          <ReworkDetails/>
        </Route>
        <Route exact path="/rejection">
          <RejectionDetails />
        </Route>


      </Switch>
    </Router>
  );
}

export default App;

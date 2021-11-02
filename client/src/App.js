import './App.css';
import React from 'react'
import Register from './components/Form/Adminlogin/Register';
import AdminLogin from './components/Form/Adminlogin/Adminlogin';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Userlogin from './components/Form/Userlogin/Userlogin';
import Masterlogin from './components/Form/Masterlogin/Masterlogin';
import Adminhome from './components/Home/Adminhome/Adminhome';

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
      </Switch>
    </Router>
  );
}

export default App;

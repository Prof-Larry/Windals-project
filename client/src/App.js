import './App.css';
import { useState } from 'react';
import Register from './components/Form/Register';
import Login from './components/Form/Login';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  // const [user, setLoginUser] = useState({});

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Home></Home>
          </div>
        </Route>
        <Route exact path="/login">
          <div className="App">
            <Login></Login>
          </div>
        </Route>
        <Route exact path="/register">
          <div className="App">
            <Register></Register>
          </div>
        </Route>
      </Switch>
    </Router>
    // <div className="App">
    //   <Login></Login>
    // </div>
  );
}

export default App;

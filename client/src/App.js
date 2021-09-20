import './App.css';
import { useState } from 'react';
import Register from './components/Form/Register';
import Login from './components/Form/Login';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user && user._id ? <Home /> : <Login setLoginUser={setLoginUser} />}
        </Route>
        <Route exact path="/login">
          <Login setLoginUser={setLoginUser} />
        </Route>
        <Route exact path="/register">
          <Register></Register>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

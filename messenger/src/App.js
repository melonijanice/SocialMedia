import logo from "./logo.svg";
import "./App.css";
import { Router } from "@reach/router";
import Register from "./views/Register";
import Logout from "./registration/Logout"
import Login from "./registration/Login";
import Messenger from "./Messenger/Messenger"


function App() {
  return (
    
      <Router>
        <Login path="/user/login/"/>
        <Logout path="/user/logout/"/>
        <Register path="/user/register"></Register>
        <Messenger path="/user/inbox"></Messenger>
      </Router>
   
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { Router } from "@reach/router";
import Register from "./views/Register";
import Logout from "./registration/Logout"
import Login from "./registration/Login";


function App() {
  return (
    <div>
      <Router>
        <Login exact path="/user/login/"/>
        <Logout exact path="/user/logout/"/>
        <Register exact path="/user/register"></Register>
      </Router>
      {/* <ComboBox></ComboBox> */}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Login from "../registration/Login";


export default function Home() {
  const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
  console.log(localStorage.getItem("userData"));
  const [User, setLoggedInUser] = useState({});
  useEffect(() => {
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    console.log(LoggedInUser);
    setLoggedInUser(LoggedInUser);
  }, []);
  return (
    <div>
      <div>
        {cookie &&<Navbar />}

        {!cookie && <Login></Login>}
      </div>

    
    </div>
  );
}

import UserForm from "../ManageUsers/UserForm";
import axios from "axios";
import React, { useState } from "react";
import { navigate } from "@reach/router";
import Navbar from "../Navigation/Navbar";


export default function Register(props) {
  const [errors, setErrors] = useState({});

  const createUserInfo = (userData) => {
    axios
      .post("http://localhost:8000/api/users", userData)
      .then((res) => {
        console.log(res.data.userLoggedIn);
        localStorage.user = JSON.stringify(res.data.userLoggedIn);
          navigate("/user/home");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };
  return (
<div>
<div>
       <Navbar />
      </div>
        <UserForm
          userData=""
          errors={errors}
          onSubmitProp={createUserInfo}
        
        ></UserForm>
    
    
    </div>
  );
}

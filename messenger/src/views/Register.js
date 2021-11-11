import UserForm from "../ManageUsers/UserForm";
import axios from "axios";
import React, { useState } from "react";
import { navigate } from "@reach/router";


export default function Register(props) {
  const [errors, setErrors] = useState({});

  const createUserInfo = (userData) => {
    axios
      .post("http://localhost:8000/api/users", userData,{
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.user._id);
          navigate("/user/login");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };
  return (
<div>

        <UserForm
          userData=""
          errors={errors}
          onSubmitProp={createUserInfo}
        
        ></UserForm>
    
    </div>
  );
}

import Box from "@mui/material/Box";
import React, { useReducer } from "react";
import TextField from "@mui/material/TextField";
import "../App.css";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';

export default function UserForm(props) {


  return (
    <Box
      component="form"
      sx={{
        marginLeft: {md: 25, lg:50 },
        marginTop: "30px",
        minWidth: { md: 350 },
        width: 600,
        flexDirection: "column",
        alignItems: { xs: "center", md: "flex-start" },
        "& .MuiTextField-root": { ml: 4, width: "50ch"}
      }}
      noValidate
      autoComplete="off"
    >
<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Box>
  );
}
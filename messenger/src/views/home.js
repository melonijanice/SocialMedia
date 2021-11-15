import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import Login from "../registration/Login";
import axios from "axios";
import { navigate } from "@reach/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PostCreate from "../Posts/PostCreate";


export default function Home() {
  const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
  console.log(localStorage.getItem("userData"));
  const [User, setLoggedInUser] = useState({});
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    console.log(LoggedInUser);
    setLoggedInUser(LoggedInUser);
    axios
      .get("http://localhost:8000/api/users", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        navigate(`/user/home`);
      });
  }, []);
  return (
    <div>
      <div>
        {cookie && <Navbar />}

        {!cookie && <Login></Login>}
      </div>
      <Box
        elevation={7}
        sx={{
          bgcolor: "background.paper",
          p: 1,
          m: 1,
          display: "flex",
        }}
      >
        <PostCreate/>
      
       
        <Box
          sx={{
            bgcolor: "background.paper",
            m: 1,
            p: 1,
          }}
        >
          {users.map((user) => (
            <Box
              name={user._id}
              sx={{
                maxWidth: 500,
                my: 1,
                mx: "auto",
                p: 2,
                backgroundColor: "#EFDECD",
                "&:hover": {
                  backgroundColor: "#EFDECD",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Grid container wrap="nowrap">
                <Grid item>
                  <Avatar>
                    {user.firstName.charAt(0) + user.lastName.charAt(0)}
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography>
                    {user.firstName + " " + user.lastName}
                  </Typography>
                  <Typography>
                    <Button variant="contained" color="success">
                      Follow
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}

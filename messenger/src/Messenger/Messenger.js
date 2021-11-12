import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { navigate } from "@reach/router";

const message = `Janice Mathias`;

export default function Messenger() {
    const [currentmsg,setCurrentmsg]=useState("")
    const [user,setLoggedInUser]=useState({})
    const [followers,setFollowers]=useState([])
    useEffect(() => {

        const LoggedInUser = JSON.parse(localStorage.user);
        setLoggedInUser(LoggedInUser);
        axios
          .get("http://localhost:8000/api/users", {
            withCredentials: true,
          })
          .then((res) => {
              console.log(res.data)
            setFollowers(res.data); // [1, 2, 3]
            //setUsers(arr);
            //console.log("all products"+ res.data)
          })
          .catch((err) => {
            
            navigate(`/admin/home`);
          });
      }, []);
    const sendHandler=(e)=>
    {
        e.preventDefault();
        
        const postData={MessageBody: currentmsg,toWhom:[user.user_id],FromUser:[user.user_id]} 
        console.log(postData);
        axios
          .post("http://localhost:8000/api/messages", postData , { withCredentials: true })
          .then((res) => {
            console.log("sending data", res);
        })
          .catch((err) => {
            console.log(err.response);
            //setErrors(err.response.data.errors);
          });

    }
  return (
    <Box sx={{ display: "flex", m: 5 }}>
      <Box>
      {followers.map((follower)=> <Paper
          sx={{
            maxWidth: 500,
            my: 1,
            mx: "auto",
            p: 2,
            "&:hover": {
              backgroundColor: "#EFDECD",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <Grid container wrap="nowrap">
            <Grid item>
              <Avatar>{follower.firstName.charAt(0)+follower.lastName.charAt(0)}</Avatar>
            </Grid>
            <Grid item xs>
              <Typography>{follower.firstName + " "+follower.lastName}</Typography>
            </Grid>
          </Grid>
        </Paper>)}
       
      </Box>
      <Box>
        <Paper
       
        >
        <p>This is message from Janice</p>
        <p>This is message from Varsha</p>
          <Box sx={{ display: "flex"}}>
            <TextField fullWidth label="Type here" id="messageInout" value={currentmsg} onChange={(e)=>setCurrentmsg(e.target.value)}/>
            <IconButton
                
                onClick={sendHandler}
                
              >
               <SendIcon sx={{pt:3}}></SendIcon>
              </IconButton>
            
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

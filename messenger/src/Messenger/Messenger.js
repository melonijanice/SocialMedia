import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { navigate } from "@reach/router";
import io from "socket.io-client";
import Navbar from "../Navigation/Navbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export default function Messenger(props) {
const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
console.log(localStorage.getItem("userData"));
  const [socket] = useState(() => io(":8000"));
  const [currentmsg, setCurrentmsg] = useState("");
  const [user, setLoggedInUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [clickTd, setClickedTd] = useState("");
  const [messages, setMessages] = useState([]);
  const [newmessageFrom, setnewmessageFrom] = useState([]);

  var moment = require("moment");
  useEffect(() => {
    const LoggedInUser = JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);

    let fromId;
    axios
      .get(`http://localhost:8000/api/messages/${LoggedInUser.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("All messages for users who have been contacted", res.data);
        console.log(res.data);
        //setMessages(res.data); // [1, 2, 3]
      })
      .catch((err) => {
        navigate(`/user/inbox`);
      });


    const getData = async () => {
      const pullMessages=()=>
      {axios
        .get(
          `http://localhost:8000/api/messages/${fromId}/${LoggedInUser.user_id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("All messages", res.data);
          console.log(res.data);
          setMessages(res.data); // [1, 2, 3]
        })
        .catch((err) => {
          navigate(`/user/inbox`);
        });

      }
      await axios
        .get(`http://localhost:8000/api/users/${LoggedInUser.user_id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("this user data", res.data)
          console.log(res.data);
          //Filter other than Varsha for testing- assuming she isnt follower
          const filteredNonFollowers = res.data.following
          console.log("filteredData",filteredNonFollowers)
          //setFollowers(res.data);
          console.log("clicked",props.id)
          if (props.id === "All") {
            console.log("clicked",props.id)
            
            setClickedTd(filteredNonFollowers[0]._id);
            fromId = filteredNonFollowers[0]._id;
           
            setFollowers(filteredNonFollowers);
            
            pullMessages();
          } else {
            axios
              .get(`http://localhost:8000/api/users/${props.id}`, {
                withCredentials: true,
              })
              .then((res) => {
                
                console.log("The user that doesnt exist", res.data);
                setFollowers([...filteredNonFollowers,res.data]);
               
              })
              .catch((err) => {
                navigate(`/user/inbox`);
              });
            setClickedTd(props.id);
            fromId = props.id;
            pullMessages();
          }

          console.log("from User",fromId)
          console.log("to User",LoggedInUser.user_id)
      
          
        })
        .catch((err) => {
          console.log(err)
          //navigate(`/admin/home`);
        });
    };
    getData();

    socket.on("message_" + LoggedInUser.user_id, (data) => {
      console.log("New Message");
      console.log(data.toWhom, LoggedInUser.user_id);
      setClickedTd((currentClickedId) => {
        if (currentClickedId === data.FromUser) {
          setMessages((currentMessages) => [...currentMessages, data]);
        }
        setClickedTd(currentClickedId);
      });

      setnewmessageFrom((currentFromMessages) => [
        ...currentFromMessages,
        data.FromUser,
      ]);
    });
    return () => socket.disconnect(true);
  }, []);

  const getUserMessages = (e, toWhom) => {
    e.preventDefault();
    console.log("all messages");
    console.log(newmessageFrom);
    const markAsRead = newmessageFrom.filter((item) => item !== toWhom);
    console.log("all filtered messages");
    console.log(markAsRead);
    setnewmessageFrom(markAsRead);
    setClickedTd(toWhom);
    console.log("logged in user");
    console.log(user);

    axios
      .get(`http://localhost:8000/api/messages/${toWhom}/${user.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("All messages", res.data.length);
        setMessages(res.data); // [1, 2, 3]
      })
      .catch((err) => {
        navigate(`/user/inbox`);
      });
    axios
      .put(`http://localhost:8000/api/messages/${toWhom}/${user.user_id}`)
      .then((res) => {
        console.log("updated messages", res.data);
      })
      .catch((err) => {
        navigate(`/user/inbox`);
      });
  };

  const sendHandler = (e) => {
    const postData = {
      MessageBody: currentmsg,
      toWhom: clickTd,
      FromUser: user.user_id,
    };
    console.log(postData);
    axios
      .post("http://localhost:8000/api/messages", postData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("sending data", res);
        setCurrentmsg("");
        setMessages([...messages, res.data]);

        console.log("Emit Data", res.data);
        socket.emit("sending_message", res.data);

        return () => socket.disconnect();
      })
      .catch((err) => {
        console.log(err.response);
        //setErrors(err.response.data.errors);
      });
  };
  return (
      <>
    <div>
    <Navbar />
  </div>
  {cookie && (
    <Box sx={{ display: "flex", m: 5 }}>
      <Box>
        {followers.map((follower) => (
          <Paper
            onClick={(e) => getUserMessages(e, follower._id)}
            name={follower._id}
            sx={{
              maxWidth: 500,
              my: 1,
              mx: "auto",
              p: 2,
              backgroundColor: clickTd === follower._id && "#EFDECD",
              "&:hover": {
                backgroundColor: "#EFDECD",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Grid container wrap="nowrap">
              <Grid item>
                <Avatar onClick={(e) => getUserMessages(e, follower._id)}>
                  {follower.firstName.charAt(0) + follower.lastName.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography onClick={(e) => getUserMessages(e, follower._id)}>
                  {follower.firstName + " " + follower.lastName}
                </Typography>
                <Typography onClick={(e) => getUserMessages(e, follower._id)}>
               
                  {newmessageFrom.filter((item) => item === follower._id)
                    .length > 0
                    ?<><span>{newmessageFrom.filter((item) => item === follower._id)
                    .length }</span> <img
                    
                    
                    style={{ width: "30px" }}
                    src="/new_message.png"
                    alt="Image_logo"
                  /></>
                    : ""}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>

      <Box>
        <Paper
          key={"dummy"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "auto",
            maxHeight: "500px",
            minHeight: "600px",
            minWidth: "500px",
            p: 2,
          }}
        >
          <Box>
            {messages &&
              messages.map((message) => (
                <>
                  <p className="timeStamp">
                    {moment(message.updatedAt).format("MM/DD/YYYY,h:mma")}
                  </p>
                  <p
                    className={
                      message.FromUser._id === user.user_id ||
                      message.FromUser === user.user_id
                        ? "rightAlign"
                        : "leftAlign"
                    }
                  >
                    <p> {message.MessageBody}</p>
                  </p>
                </>
              ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              autoFocus
              fullWidth
              label="Type here"
              id="messageInout"
              value={currentmsg}
              
              onChange={(e) => setCurrentmsg(e.target.value)}
            />
        <IconButton name="submit" aria-label="edit" size="large">
            <img
              onClick={sendHandler}
              style={{ width: "40px" }}
              src="/send.jpeg"
              alt="Image_logo"
            />
          </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>)}
    </>
  );
}

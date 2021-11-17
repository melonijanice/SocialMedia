import React, { useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import axios from "axios";
import { navigate } from "@reach/router";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Box from "@mui/material/Box";
import PostCreate from "../Posts/PostCreate";
import IconButton from "@mui/material/IconButton";

export default function Home() {
  const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
  console.log(localStorage.getItem("userData"));
  const [User, setLoggedInUser] = useState({});
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const LoggedInUser = localStorage.user ? JSON.parse(localStorage.user) : "";
    console.log(LoggedInUser);
    setLoggedInUser(LoggedInUser);
    axios
      .get(`http://localhost:8000/suggestions/${LoggedInUser.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFollowing(res.data.users);
      })
      .catch((err) => {
        navigate(`/user/login`);
      });
  }, []);
  const followHandler = (e) => {
    e.preventDefault();
    console.log(e.target.id);
     axios
      .put(
        `http://localhost:8000/profile/${e.target.id}/${User.user_id}/follow`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        const filterFollowers = following.filter(
          (user) => res.data.newUser._id !== user._id
        );
        console.log(filterFollowers);
        setFollowing(filterFollowers);
      })
      .catch((err) => {
        navigate(`/user/login`);
      }); 
  };
  return (
    <div>
      <div>
        <Navbar />
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
        <PostCreate />

        <Box
          sx={{
            bgcolor: "background.paper",
            m: 1,
            p: 1,
          }}
        >
          {following.map((user) => (
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
                    {/*        <Button
                      id={user._id}
                      onClick={followHandler}
                      variant="contained"
                      size="small"
                      color="success"
                    >
                      Follow
                    </Button> */}
                    <IconButton
                      id={user._id}
                      name="Delete"
                      aria-label="delete"
                      size="large"
                      onClick={followHandler}
                    >
                      <img id={user._id}
                      onClick={followHandler}
                      style={{width:"30px"}}
                        src="/add_friend.png"
                        alt="Image_logo"
                      />
                    </IconButton>
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

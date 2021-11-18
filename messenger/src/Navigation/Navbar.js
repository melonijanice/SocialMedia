

import React, { useEffect, useState } from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from "@mui/material/Avatar";


import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link} from "@reach/router";
import DrawerComponent from "../Navigation/DrawerComponent";
import Logout from "../registration/Logout";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    fontSize: "50px",
  },
  abRoot: {
    background: "linear-gradient(45deg, #383633 30%, #6F6B66 90%)",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    "&:hover": {
      color: "blue",
      borderBottom: "1px solid white",
      textDecoration: "none",
    },
  },
  BrandLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    "&:hover": {
      color: "white",
      textDecoration: "none"
    },
  },
  link_menu: {
    textDecoration: "none",
    color: "green",
    fontSize: "20px",
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2),
    "&:hover": {
      borderBottom: "1px solid white",
    },
  },
  Image: {
    width: "100px",
  },
}));

function Navbar() {
  const classes = useStyles();
  const [User, setLoggedInUser] = useState({});
  const userId = localStorage.user && JSON.parse(localStorage.user).user_id;

  useEffect(() => {
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    console.log("logged user",LoggedInUser);
    setLoggedInUser(LoggedInUser);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar
      classes={{
        root: classes.abRoot,
      }}
      position="static"
    >
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
        <Link to="/user/home">
          <img
            className={classes.Image}
            src="/Social_logo.png"
            alt="Image_logo"
          />
             </Link>
          <Link to="/user/home" className={classes.BrandLink}>
          Canvas
                </Link>
          
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            {cookie ? (
              <>
                <div></div>
                {/*       <Link to="/admin/home" className={classes.link}>
              Home
            </Link>
             */}
               <Link to="/user/home" className={classes.link}>  <img
                      style={{width:"30px"}}
                        src="/home.png"
                        alt="Image_logo"
                      /></Link>
               <Link to="/user/inbox/All" className={classes.link}>  <img
                      style={{width:"30px"}}
                        src="/message.png"
                        alt="Image_logo"
                      /></Link>

 
               <Link to="/user/marketplace" className={classes.link}><img
                      style={{width:"30px"}}
                        src="/market.png"
                        alt="Image_logo"
                      /></Link>
               
              


               
                {/*    <Link to="/admin/events" className={classes.link}>
              Manage Events
            </Link> */}

                <button
                  className="btn dropdown-toggle linkText"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {User && <Avatar sx={{ bgcolor: "blue" }}>
                      {User.firstName.charAt(0) +
                        User.lastName.charAt(0)}
                    </Avatar>} 
                  
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                    <Link className={classes.link_menu} to={`/user/${User.user_id}/viewUser`}>My Profile</Link>
                  </li>
                  <li>
                    <Link className={classes.link_menu} to={`/user/${User.user_id}/Edit`}>Edit Profile</Link>
                  </li>
                  <li>
                    <Logout></Logout>
                  </li>
                </ul>
                
              </>
            ) : (
              <Link to="/admin/home" className={classes.link}>
                Login
              </Link>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

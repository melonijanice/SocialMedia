import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ImageIcon from '@mui/icons-material/Image';
import IconButton from "@mui/material/IconButton";

const PostEdit = (props) => {
  const [postBody, setPostBody] = useState(props.postData);
  const [post, setPost] = useState("")


  const [errors, setErrors] = useState({});
  const [user, setLoggedInUser] = useState({});
  useEffect(() => {
    const LoggedInUser = JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${props.id}`,{
        withCredentials: true,
      })
    .then( res =>{
        console.log("res data",res.data)
        //setPost(res.data)

    })
    .catch( error => console.log(error))
}, [props.id])

  const submitHandler = (e) => {
    console.log("clicked")
    e.preventDefault();
    const newPost = {
      postBody,
      postedBy: user.user_id,
    };
    console.log(newPost);
    axios
      .put("http://localhost:8000/api/posts/"+props.id, newPost, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        props.onSubmitProp(res.data)
        //navigate("/displayPost");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
    <>
          <TextField
          sx={{ minWidth:{xs: "100px", md: "500px" }}}
          id="title"
          variant="outlined"
          defaultValue={postBody}
          value={postBody}
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        />
         <Button variant="contained" color="primary" onClick={submitHandler}>
                      Update
                    </Button>
                    {errors && errors.postBody && (
            <p className="error-text">{errors.postBody.message}</p>
          )}
                    </>
                    <IconButton
                name="Delete"
                aria-label="delete"
                size="large"
              >
                <ImageIcon fontSize="inherit" />
              </IconButton>
        </Box>
       
       
    </div>
  );
};
export default PostEdit;

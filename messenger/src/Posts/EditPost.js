import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
  });

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
  const cancelHandler = (e) => {
    console.log("clicked")
    e.preventDefault();
    props.onSubmitProp("cancel")
    
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
          label="Editing post"
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
                    <Button variant="contained" color="primary" onClick={cancelHandler}>
                      Cancel
                    </Button>
                    {errors && errors.postBody && (
            <p className="error-text">{errors.postBody.message}</p>
          )}
                    </>
       
        </Box>
       
       
    </div>
  );
};
export default PostEdit;

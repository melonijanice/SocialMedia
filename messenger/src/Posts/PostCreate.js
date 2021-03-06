import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PostDisplay from "../Posts/PostDisplay";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Input = styled("input")({
  display: "none",
});

const PostCreate = (e) => {
  const [postBody, setPostBody] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setLoggedInUser] = useState({});
  const [newPost, setnewPost] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);
  }, []);
  const onChangeFileHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const cancelImage = (e) => {
    e.preventDefault();
    setFile("");
  };

  const onSubmitFileHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    axios
      .post("http://localhost:8000/api/upload", formData)
      .then((res) => {
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const submitHandler = (e) => {
    console.log("clicked");
    e.preventDefault();

    const newPost = {
      postBody,
      Image: file.name,
      postedBy: user.user_id,
    };
    console.log(newPost);
    axios
      .post("http://localhost:8000/api/posts", newPost, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setnewPost(res.data);
        setPostBody("");
        if (file !== "") {
          onSubmitFileHandler();
          setFile("");
        }
        setErrors("");
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
            sx={{ minWidth: { xs: "100px", md: "500px" } }}
            id="title"
            label="Share your thoughts"
            variant="outlined"
            value={postBody}
            onChange={(e) => {
              setPostBody(e.target.value);
            }}
          />
          {/* <Button variant="contained" color="primary" onClick={submitHandler}>
            Post
          </Button> */}

          <IconButton name="submit" aria-label="edit" size="large">
            <img
              onClick={submitHandler}
              style={{ width: "66px", marginTop: "-18px", background: "white" }}
              src="/post.jpeg"
              alt="Image_logo"
            />
          </IconButton>

          {errors && errors.postBody && (
            <p className="error-text">{errors.postBody.message}</p>
          )}
        </>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={onChangeFileHandler}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <img
              style={{ width: "48px", marginTop: "-18px", marginLeft: "-18px" }}
              src="/camera.png"
              alt="Image_logo"
            />
          </IconButton>
        </label>
        <span>{file.name}</span>
        {file && (
          <IconButton
            name="Delete"
            aria-label="delete"
            size="large"
            onClick={cancelImage}
          >
            <RemoveCircleOutlineIcon fontSize="inherit" />
          </IconButton>
        )}
      </Box>

      <PostDisplay newPost={newPost} />
    </div>
  );
};
export default PostCreate;

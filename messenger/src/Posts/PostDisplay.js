import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// import { Link, navigate } from "@reach/router";
// import ReactImageMagnify from "react-image-magnify";
/* import CommentCreate from "./CommentCreate";
import CommentDisplay from "./CommentDisplay"; */

const PostDisplay = (props) => {
  const [posts, setPosts] = useState([]);
  const [newCommentLoaded, setNewCommentLoaded] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts", {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [newCommentLoaded]);
  const setNewCommentHandler = (newComment) => {
    console.log("new comment ");
    console.log(newComment);
    setNewCommentLoaded(newComment);
  };

  return (
    <>
      {posts.map((element, index) => (
        <Paper
          elevation={7}
          sx={{
            bgcolor: "background.paper",
            p: 4,
            minWidth: 300,
            m: 2,
            display: "flex",
          }}
        >
          <div class="card-body">
            <div style={{textAlign:"right"}}>
            <IconButton
                id={element._id}
                name="Edit"
                
                aria-label="edit"
                size="small"
              >
                <EditIcon id={element._id} name="Edit" fontSize="inherit" />
              </IconButton>
          <IconButton
                id={element._id}
                name="Delete"
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              </div>
            <p>
              <span style={{ fontWeight: "bold" }}>
                {element.postedBy.firstName + " " + element.postedBy.lastName}
              </span>{" "}
              <span style={{ color: "grey" }}>posted on their canvas</span>
            </p>
            <p class="card-text">{element.postBody}</p>
         
            {/*    <CommentCreate
                    postId={element._id}
                    onSubmitProp={setNewCommentHandler}
                  ></CommentCreate>
                  <CommentDisplay
                    onCommentCreationProp={newCommentLoaded}
                    postId={element._id}
                  ></CommentDisplay> */}

            {/* <input type="text"></input> */}
          </div>
        </Paper>
      ))}
    </>
  );
};

export default PostDisplay;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
// import ReactImageMagnify from "react-image-magnify";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import RepliesToComments from "./RepliesToComments";
const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [user, setLoggedInUser] = useState({});
  const [newPost, setNewPost] = useState(props.newPost);
  const [newCommentLoaded, setNewCommentLoaded] = useState(
    props.onCommentCreationProp
  );

  useEffect(() => {
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);
    axios
      .get("http://localhost:8000/api/comments/" + props.postId, {
        withCredentials: true,
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.newPost, props.onCommentCreationProp]);
  const showReplies = (e) => {
    setReply(e.target.id);
  };

  return (
    <>
      <div
        className="flex"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // maxWidth: "200px",
        }}
      >
        {" "}
        <div style={{ marginTop: "15px", marginLeft: "20px" }}>
          {/* <h5 style={{ marginTop: "10px" }}>Comments</h5> */}

          {comments.map((element, index) => (
            <>
              <Grid sx={{ display: "flex" }}>
                <Avatar sx={{ bgcolor: "green" }}>
                  {element.commentedBy.firstName.charAt(0) +
                    element.commentedBy.lastName.charAt(0)}
                </Avatar>
                <Grid
                  sx={{
                    p: 1,
                    borderRadius: "8px",
                    minWidth: "300px",
                    minHeight: "50px",
                    background: "#E6E6E3",
                  }}
                >
                  {element.commentBody}
                </Grid>
              </Grid>
              {/* <p class="card-text"></p>{" "} */}
              {/* <p>commented by {element.commentedBy.firstName}.</p> */}
              <Grid sx={{ ml: 35 }}>
                <Link
                  component="button"
                  variant="body2"
                  id={element._id}
                  onClick={showReplies}
                >
                  reply
                </Link>
              </Grid>
              {/* {element._id === reply && ( */}
              <p>
                {" "}
                <RepliesToComments
                  commentId={element._id}
                  onSubmitProp={setReply}
                  onReply={reply}
                />
              </p>
              {/* )} */}
            </>
          ))}
          {/* <p>{props.onCommentCreationProp.commentBody}</p>
            <p>{props.postId}</p>
            <p>{props.onCommentCreationProp.commentedOn}</p> */}
          {/* <p>
                  {props.onCommentCreationProp &&
                  props.postId === props.onCommentCreationProp.commentedOn
                    ? props.onCommentCreationProp.commentBody
                    : ""}
                </p> */}
        </div>
      </div>
    </>
  );
};

export default Comment;

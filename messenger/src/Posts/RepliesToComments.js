import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";

const RepliesToComments = (props) => {
  const [replyBody, setReplyBody] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setLoggedInUser] = useState({});
  const [reply, setReply] = useState([]);
  const [successfulDeleteBoolen, setSuccessfulDeleteBoolean] = useState(false);
  useEffect(() => {
    const LoggedInUser = JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/reply/" + props.commentId, {
        withCredentials: true,
      })
      .then((res) => {
        setReply(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [successfulDeleteBoolen]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newReply = {
      replyBody,
      repliedOn: props.commentId,
      repliedBy: user.user_id,
    };

    console.log("comment id", props.commentId);
    console.log(newReply);
    axios
      .post("http://localhost:8000/api/reply", newReply, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setSuccessfulDeleteBoolean(!successfulDeleteBoolen);
        props.onSubmitProp("");
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler}>
          {props.onReply === props.commentId && (
            <div>
              <Input
                placeholder="Reply......"
                sx={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  minWidth: "350px",
                  minHeight: "45px",
                  ml: 4,
                  background: "#D3D3D3",
                }}
                type="text"
                value={replyBody}
                onChange={(e) => {
                  setReplyBody(e.target.value);
                }}
              />

              <IconButton name="submit" aria-label="edit" size="large">
                <img
                  onClick={submitHandler}
                  style={{ width: "40px" }}
                  src="/send.jpeg"
                  alt="Image_logo"
                />
              </IconButton>
              {/* <input
                type="text"
                value={replyBody}
                placeholder="Do reply....."
                onChange={(e) => {
                  setReplyBody(e.target.value);
                }}
              />

              <button
                className="btn btn-primary"
                // style={{ padding: "10px" }}
                type="submit"
              >
                Reply
              </button> */}
              {errors && errors.replyBody && (
                <p className="error-text">{errors.replyBody.message}</p>
              )}
            </div>
          )}
        </form>
      </div>
      <div className="container">
        <div class="dojo"></div>
        <div className="a"></div>
        <div className="row">
          <div
            className="flex"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              maxWidth: "200px",
            }}
          >
            {" "}
            <div class="card-body">
              {reply.map((element, index) => (
                <>
                  <Grid sx={{ display: "flex", m: 2 }}>
                    <Avatar sx={{ bgcolor: "blue" }}>
                      {element.repliedBy.firstName.charAt(0) +
                        element.repliedBy.lastName.charAt(0)}
                    </Avatar>
                    <Grid
                      sx={{
                        p: 1,
                        borderRadius: "8px",
                        minWidth: "250px",
                        minHeight: "40px",
                        background: "#E6E6E3",
                      }}
                    >
                      {element.replyBody}
                    </Grid>
                  </Grid>
                  {/* <p class="card-text">{element.replyBody}</p>
                  <p>replied by {element.repliedBy.firstName}.</p> */}
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
        </div>
      </div>
    </>
  );
};
export default RepliesToComments;

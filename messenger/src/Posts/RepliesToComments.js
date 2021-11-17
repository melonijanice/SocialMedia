import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

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
          <div>
            <input
              type="text"
              value={replyBody}
              placeholder="Do reply....."
              onChange={(e) => {
                setReplyBody(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              style={{ marginLeft: "8px" }}
              type="submit"
            >
              Reply
            </button>
            {errors && errors.replyBody && (
              <p className="error-text">{errors.replyBody.message}</p>
            )}
          </div>
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
              <h5 class="card-title">Replies</h5>
              <div
                class="card"
                style={{
                  minHeight: "200px",
                  minWidth: "250px",
                  marginLeft: "-20px",
                }}
              >
                {reply.map((element, index) => (
                  <>
                    <p class="card-text">{element.replyBody}</p>
                    <p>replied by {element.repliedBy.firstName}.</p>
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
      </div>
    </>
  );
};
export default RepliesToComments;

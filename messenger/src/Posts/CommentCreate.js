import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const CommentCreate = (props) => {
  const [commentBody, setCommentBody] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setLoggedInUser] = useState({});

  useEffect(() => {
    const LoggedInUser = JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const newComment = {
      commentBody,
      commentedOn: props.postId,
      commentedBy: user.user_id,
    };
    console.log("post id", props.postId);
    console.log(newComment);
    axios
      .post("http://localhost:8000/api/comments", newComment, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        props.onSubmitProp(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div>
          <label className="form-label">Add Comment:</label>
          <br></br>
          <input
            type="text"
            value={commentBody}
            onChange={(e) => {
              setCommentBody(e.target.value);
            }}
          />
          <button
            className="btn btn-primary"
            style={{ marginLeft: "8px" }}
            type="submit"
          >
            Add Comment
          </button>
          {errors && errors.commentBody && (
            <p className="error-text">{errors.commentBody.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};
export default CommentCreate;

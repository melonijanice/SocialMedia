import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
// import ReactImageMagnify from "react-image-magnify";
import RepliesToComments from "./RepliesToComments";
const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [newCommentLoaded, setNewCommentLoaded] = useState(
    props.onCommentCreationProp
  );
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/comments/" + props.postId, {
        withCredentials: true,
      })
      .then((res) => {
        setComments(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const showReplies = (e) => {
    setReply(e.target.id);
  };

  return (
    <>
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
              <h5 class="card-title" style={{ marginTop: "-0px" }}>
                Comments
              </h5>
              <div
                class="card"
                style={{
                  minHeight: "200px",
                  minWidth: "300px",
                  marginLeft: "-5px",
                }}
              >
                {comments.map((element, index) => (
                  <>
                  
                    <p class="card-text">{element.commentBody}</p>{" "}
                    <p>commented by {element.commentedBy.firstName}.</p>
                    <Link
                      component="button"
                      variant="body2"
                      id={element._id}
                      onClick={showReplies}
                    >
                      reply
                    </Link>
                    {element._id === reply && (
                      <p>
                        {" "}
                        <RepliesToComments
                          commentId={element._id}
                          onSubmitProp={setReply}
                        />
                      </p>
                    )}
                  </>
                ))}
                {/* <p>{props.onCommentCreationProp.commentBody}</p>
            <p>{props.postId}</p>
            <p>{props.onCommentCreationProp.commentedOn}</p> */}
                <p>
                  {props.onCommentCreationProp &&
                  props.postId === props.onCommentCreationProp.commentedOn
                    ? props.onCommentCreationProp.commentBody
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;

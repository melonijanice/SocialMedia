import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostEdit from "./EditPost";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { Link, navigate } from "@reach/router";
// import ReactImageMagnify from "react-image-magnify";
import CommentCreate from "./CommentCreate";
import CommentDisplay from "./CommentDisplay";
import RepliesToComments from "./RepliesToComments";

const PostDisplay = (props) => {
  const [posts, setPosts] = useState([]);
  const [newCommentLoaded, setNewCommentLoaded] = useState(false);
  const [newPostsLoaded, setnewPostsLoaded] = useState(false);
  // const [successfulDeleteBoolen, setSuccessfulDeleteBoolean] = useState(false);
  const [elementMode, setElementMode] = useState("");
  const [deleteFlag, setdeleteFlag] = useState(false);
  const [user, setLoggedInUser] = useState("");
  const [userInfo, setUserInfo] = useState({})

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const LoggedInUser = JSON.parse(localStorage.user);
    setLoggedInUser(LoggedInUser);
    console.log("new post", props.newPost);

    axios
      .get(`http://localhost:8000/api/posts/follower/${LoggedInUser.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setnewPostsLoaded(!newPostsLoaded);
      })
      .catch((err) => console.log(err));

      axios
      .get(`http://localhost:8000/api/users/${LoggedInUser.user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Result: ", res.data);
        
        // localStorage.userRecord = JSON.stringify(res.data);
        // const userRecord = localStorage.userRecord;
        setUserInfo(res.data);
        // setPosts(res.data);
        // setnewPostsLoaded(!newPostsLoaded);
      })
      .catch((err) => console.log(err));

  }, [deleteFlag, props.newPost, liked, saved]);

  const setNewCommentHandler = (newComment) => {
    setNewCommentLoaded(newComment);
  };

  const likeHandler = (postId) => {
    const id = user.user_id;

    axios
      .patch(
        `http://localhost:8000/api/posts/${postId}/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLiked(!liked);
      })
      .catch((err) => console.log(err));
  };

  const unlikeHandler = (postId) => {
    const id = user.user_id;

    axios
      .patch(
        `http://localhost:8000/api/posts/${postId}/unlike/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setLiked(!liked);
      })
      .catch((err) => console.log(err.response));
  };

  const saveHandler = (postId) => {
    axios
      .patch(
        `http://localhost:8000/api/posts/${postId}/save/${user.user_id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(`Post ${postId} saved.`);
        setSaved(!saved);
      })
      .catch((err) => console.log(err.response));
  };

  const unsaveHandler = (postId) => {
    axios
      .patch(
        `http://localhost:8000/api/posts/${postId}/unsave/${user.user_id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(`Post ${postId} unsaved.`);
        setSaved(!saved);
      })
      .catch((err) => console.log(err.response));
  };

  const editHandler = (event) => {
    event.preventDefault();

    console.log("Edit", event.target.id);

    setElementMode(event.target.id);
    //navigate(`/admin/${item}/EditAuthor`);
  };
  const deleteHandler = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:8000/api/posts/${event.target.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setdeleteFlag(!deleteFlag);
      })
      .catch((err) => {
        console.log("Error");
      });
  };
  const onEditDataHandler = (updatedPost) => {
    if (updatedPost === "cancel") {
      setElementMode("");
    } else {
      setElementMode("");

      //       console.log("new data", updatedPost);
      //       let filteredPosts = posts.filter((post) => post._id !== updatedPost._id);
      //       console.log(filteredPosts);
      //       filteredPosts = [updatedPost, ...filteredPosts];
      //       console.log(filteredPosts);

      let filteredPosts = posts.filter((post) => post._id !== updatedPost._id);

      filteredPosts = [updatedPost, ...filteredPosts];

      setPosts(filteredPosts);
    }
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
          <div>
          
            <div style={{ display: elementMode === element._id ? "none" : "" }}>
              <>
                <span style={{ fontWeight: "bold" }}>
                  {element.postedBy.firstName + " " + element.postedBy.lastName}
                </span>{" "}
                <span style={{ color: "grey" }}>
                  posted on their canvas on
                  {" " +
                    moment(element.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </span> {user.user_id === element.postedBy._id && (
              <span style={{ textAlign: "right" }}>
                <IconButton
                  id={element._id}
                  name="Edit"
                  onClick={editHandler}
                  aria-label="edit"
                  size="small"
                >
                  <img
                    id={element._id}
                    onClick={editHandler}
                    style={{ width: "20px" }}
                    src="/edit.png"
                    alt="Image_logo"
                  />
                </IconButton>
                <IconButton
                  id={element._id}
                  name="Delete"
                  aria-label="delete"
                  size="small"
                  onClick={deleteHandler}
                >
                  <img
                    id={element._id}
                    onClick={deleteHandler}
                    style={{ width: "20px" }}
                    src="/delete.jpeg"
                    alt="Image_logo"
                  />
                </IconButton>
              </span>
            )}
              </>
              <p class="card-text">{element.postBody}</p>

              {element.Image.length !== 0 && (
                <CardMedia
                  sx={{ maxWidth: "300px" }}
                  component="img"
                  image={`http://localhost:8000/Images/${element.Image}`}
                />
              )}

              <IconButton id={element._id}>
                {element.likedBy.filter(
                  (likedUser) => likedUser._id === user.user_id
                ).length > 0 ? (
                  <FavoriteIcon
                    id={element._id}
                    onClick={() => unlikeHandler(element._id)}
                    sx={{
                      color: "red",
                    }}
                  />
                ) : (
                  <FavoriteIcon
                    id={element._id}
                    onClick={() => likeHandler(element._id)}
                  />
                )}
              </IconButton>

              <IconButton id={element._id}>
                { console.log("User Info: ", userInfo)}
                {userInfo.saved.filter((savedPost) => savedPost === element._id)
                  .length > 0 ? (
                  <BookmarkIcon
                    id={element._id}
                    onClick={() => unsaveHandler(element._id)}
                    sx={{ color: "red" }}
                  />
                ) : (
                  <BookmarkBorderIcon
                    id={element._id}
                    onClick={() => saveHandler(element._id)}
                  />
                )}
              </IconButton>
            </div>
            {elementMode === element._id && (
              <PostEdit
                id={element._id}
                postData={element.postBody}
                onSubmitProp={onEditDataHandler}
              />
            )}

            <CommentCreate newPost={newPostsLoaded}
              postId={element._id}
              onSubmitProp={setNewCommentHandler}
              newPost={newPostsLoaded}
            ></CommentCreate>
            <CommentDisplay
              newPost={newPostsLoaded}
              onCommentCreationProp={newCommentLoaded}
              postId={element._id}
            ></CommentDisplay>
          </div>
        </Paper>
      ))}
    </>
  );
};

export default PostDisplay;

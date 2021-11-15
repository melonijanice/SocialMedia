import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PostEdit from "./EditPost";
import CardMedia from "@mui/material/CardMedia";

// import { Link, navigate } from "@reach/router";
// import ReactImageMagnify from "react-image-magnify";
/* import CommentCreate from "./CommentCreate";
import CommentDisplay from "./CommentDisplay"; */

const PostDisplay = (props) => {
  const [posts, setPosts] = useState([]);
  const [newCommentLoaded, setNewCommentLoaded] = useState("");
  const [elementMode,setElementMode]=useState("")
  const [deleteFlag, setdeleteFlag] = useState(false);
  useEffect(() => {
    console.log("new post",props.newPost)
    axios
      .get("http://localhost:8000/api/posts", {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [newCommentLoaded,deleteFlag,props.newPost]);
  const setNewCommentHandler = (newComment) => {
    console.log("new comment ");
    console.log(newComment);
    setNewCommentLoaded(newComment);
  };

  const editHandler = (event) => {
    event.preventDefault();
      console.log("Edit",event.target.id)

      setElementMode(event.target.id)
      //navigate(`/admin/${item}/EditAuthor`);
  
    }
  const deleteHandler=(event)=>
  {
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
  }
  const onEditDataHandler=(updatedPost)=>
  {
    if(updatedPost==="cancel")
    {
      setElementMode("")
    
    }
    else
    {
      setElementMode("")
    console.log("new data",updatedPost)
    let filteredPosts=posts.filter(post=>post._id!==updatedPost._id)
    console.log(filteredPosts)
    filteredPosts=[updatedPost,...filteredPosts]
    console.log(filteredPosts)
    setPosts(filteredPosts)
    }
    

  }
  
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
                onClick={editHandler}
                aria-label="edit"
                size="large"
              >
                <EditIcon id={element._id} name="Edit" fontSize="inherit" onClick={editHandler}/>
              </IconButton>
          <IconButton
                id={element._id}
                name="Delete"
                aria-label="delete"
                size="large"
                onClick={deleteHandler}
              >
                <DeleteIcon id={element._id} fontSize="inherit" onClick={deleteHandler}/>
              </IconButton>
              </div>
              <div style={{ display:elementMode===element._id?"none":""}}>
            <p>
              <span style={{ fontWeight: "bold" }}>
                {element.postedBy.firstName + " " + element.postedBy.lastName}
              </span>{" "}
              <span style={{ color: "grey" }}>posted on their canvas</span>
            </p>
            <p class="card-text">{element.postBody}</p>
            {element.Image &&<CardMedia sx={{maxWidth:"400px"}}
              component="img"
              image={`http://localhost:8000/Images/${element.Image}`}
             
            />}
         </div> 
         {elementMode===element._id && <PostEdit id={element._id} postData={element.postBody} onSubmitProp={onEditDataHandler}/>}
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

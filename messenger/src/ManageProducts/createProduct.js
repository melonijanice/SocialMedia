import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../Navigation/Navbar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function CreateProduct() {
  const userId = localStorage.user && JSON.parse(localStorage.user).user_id;
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
/*   const [owner, setOwner] = useState("");
  const [errors, setErrors] = useState({}); */
  const [productsRenderFlag, setProductsRenderFlag] = useState(false);
  const [file, setFile] = useState("");
  const Input = styled("input")({
    display: "none",
  });

  useEffect(() => {}, [productsRenderFlag]);
  const onChangeFileHandler = (e) => {
    e.preventDefault();
   
    setFile(e.target.files[0]);
    setImages(e.target.files[0].name)
   
  };
  const cancelImage = (e) => {
    e.preventDefault();
    setFile("");
    setImages("")
  };
  const onSubmitFileHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
  

    axios
      .post("http://localhost:8000/api/upload", formData)
      .then((res) => {
       
      })

      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("inside submit handler",{
        userId,
        productId,
        title,
        price,
        description,
        images:file&&file.name,
      });
    axios
      .post("http://localhost:8000/api/product", {
        owner_id: userId,
        product_id: productId,
        title: title,
        price: price,
        description: description,
        images: file.name,
      })
      .then((res) => {
        console.log(
          "res.data.message after creating product",
          res.data
        );
        if (file !== "") {
          onSubmitFileHandler();
          setFile("");
        }
        setProductsRenderFlag(!productsRenderFlag);
        navigate("/user/marketplace");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <Navbar />

      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          marginLeft: { md: 25, lg: 25 },
          marginTop: { md: 5, lg: 5 },
          "& .MuiTextField-root": { m: 1, width: "100ch" },
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Create Product</h2>

        <TextField
          required
          variant="outlined"
          id="outlined-required"
          label="product_id"
          defaultValue=""
          onChange={(e) => {
            setProductId(e.target.value);
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Title"
          defaultValue=""
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Price"
          defaultValue=""
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <TextField
          required
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          rows={4}
          defaultValue=""
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

      

        <div>
          
          <TextField
          
          id="outlined-required"
          defaultValue=""
          disabled
          value={images}
          onChange={(e) => {
            setImages(file.name);
          }}
        />
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
                style={{ width: "30px" }}
                src="/camera.png"
                alt="Image_logo"
              />
            </IconButton>
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
          </label>
          <span></span>
          <Button type="submit" variant="contained" size="large">
            {" "}
            Submit New Product
          </Button>
        </div>

        {/* <button className="create" type="submit">Create new product</button> */}

        {/* </form> */}
      </Box>
    </div>
  );
}

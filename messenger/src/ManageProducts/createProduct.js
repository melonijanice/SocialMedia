import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, navigate} from '@reach/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function CreateProduct() {

    const [productId, setProductId] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const [owner, setOwner] = useState("")
    const [errors, setErrors] = useState({})
    

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("inside submit handler")
        console.log({
            owner,
            productId,
            title,
            price,
            description,
            images

        })
        axios.post('http://localhost:8000/api/product',{
            owner:owner,
            product_id:productId,
            title:title,
            price:price,
            description:description,
            images:images,

        })
        .then(res =>{
            console.log("res.data.message after creating product", res.data.message)
            navigate("/")
        })
        .catch( error =>{
            console.log(error.response)
        })
    }


    return (
        <div>
            <h2>Create Product</h2>

            <Box
                component="form"
                onSubmit={submitHandler}
                sx={{
                    marginLeft: {md: 25, lg:50 },
                    marginTop: "30px",
                    minWidth: { md: 350 },
                    width: 600,
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                    "& .MuiTextField-root": { ml: 4, width: "50ch"}
                }}
                noValidate
                autoComplete="off"

            >



            {/* <form onSubmit={submitHandler}> */}

                <TextField
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="product_id"
                    defaultValue=""
                    onChange={(e)=>{setProductId(e.target.value)}}
                    
                />
                

                <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    defaultValue=""
                    onChange={(e)=>{setTitle(e.target.value)}}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Price"
                    defaultValue=""
                    onChange={(e)=>{setPrice(e.target.value)}}
                />

                <TextField
                    
                    required
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    onChange={(e)=>{setDescription(e.target.value)}}
                />

                <TextField
                    label="images"
                    id="outlined-required"
                    defaultValue=""
                    onChange={(e)=>{setImages(e.target.value)}}
                />


                {/* <Button variant="contained" size="large"> Submit</Button> */}
                <button className="create" type="submit">Create new product</button>


            {/* </form> */}

            </Box>


            
        </div>
    )
}

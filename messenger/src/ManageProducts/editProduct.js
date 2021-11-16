import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, navigate} from '@reach/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../Navigation/Navbar' 


export default function EditProduct(props) {

    const [product, setProduct] = useState("")
    const [productId, setProductId] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const [owner_id, setOwner_id] = useState("")
    const [errors, setErrors] = useState({})
    const [loaded, setLoaded] = useState(false);
    

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${props.id}`)
        .then( res =>{
            setProduct(res.data)
            setLoaded(true)
        })
        .catch( error => console.log(error))
    }, [loaded])
    console.log("received from db",product)

    console.log("sent to put",{
        // owner_id,
        productId,
        title,
        price,
        description,
        images

    })
    

    const submitHandler = (e)=>{
        e.preventDefault();

        axios.put(`http://localhost:8000/api/product/${props.id}`,{
            // owner_id:owner_id,
            product_id:productId,
            title:title,
            price:price,
            description:description,
            images:images,

        })
        .then(res =>{
            console.log("res.data.message after creating product", res.data.message)
            navigate("/user/marketplace")
        })
        .catch( error =>{
            console.log(error.response)
        })
    }


    return (
        <div>

            {loaded && (<Box
                component="form"
                onSubmit={submitHandler}
                sx={{
                    marginLeft: {md: 25, lg:25 },
                    marginTop: {md: 5, lg:5 },
                    '& .MuiTextField-root': { m: 1, width: '100ch' },
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                }}
                noValidate
                autoComplete="off"

            >



                <h2>Edit Product</h2>

                <TextField
                    required
                    variant="outlined"
                    id="outlined-required"
                    label="product_id"
                    defaultValue={product.product_id}
                    onChange={(e)=>{setProductId(e.target.value)}}
                    margine = "dense"
                    
                />
                

                <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    defaultValue={product.title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Price"
                    defaultValue={product.price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                />

                <TextField
                    
                    required
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue={product.description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                />

                <TextField
                    label="images"
                    id="outlined-required"
                    defaultValue={product.images}
                    onChange={(e)=>{setImages(e.target.value)}}
                />

                <Box>
                <Button type="submit" variant="contained" size="large" > Edit  Product</Button>
                </Box>


            {/* </form> */}

            </Box>)}


            
        </div>
    )
}

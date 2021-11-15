
import React from 'react'
import {useState, useEffect, useContext} from 'react'
// import './Product.css'
import {Link, navigate} from '@reach/router'
import {UserContext} from '../context'
// import Products from '../products/Products'
import axios from 'axios'


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';

import ChatIcon from '@mui/icons-material/Chat';
import PaymentIcon from '@mui/icons-material/Payment';
// import StripePayment from '../payment/StripePayment'







export default function Product(props) {


    const {isLoggedin, isAdmin , userId ,productsRenderFlag, setProductsRenderFlag} = useContext(UserContext)
    const {addCart} = useContext(UserContext)
    const {product} = props


    // const [updateProduct, setUpdateProduct] = useState({})
    let loggedInUser = product.owner //+'1'



    const likeHandler = (e)=>{
        console.log("like was clicked for", product)
        let newObject = {...product}
        newObject = {...newObject, like:newObject.like+=1}
        console.log("newObject after like is updated",newObject)

        axios.put(`http://localhost:8000/api/product/${product._id}`, newObject) //{withCredentials:true} based on group project db
        .then(res =>{
            console.log(" check if refresh is needed")
        })
        .catch( error => console.log(error))
    }


    //     const deleteItem =  (product_id)=>{
        
//         axios.delete(`http://localhost:8000/api/product/${product_id}`,{}, {withCredentials:true})
//         .then(res=> {
//             console.log(res)
//             setProductsRenderFlag(!productsRenderFlag)
//         })
//         .catch(err=> console.log(err))
        

//     }


    const deleteHandler = (product_id)=>{
        console.log("product._id on the delete", product._id)
        axios.delete(`http://localhost:8000/api/product/${product._id}`,{},{withCredentials:true})
        .then(res=>{
            console.log(res)
            setProductsRenderFlag(!productsRenderFlag)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }





    return (
        <Card sx={{ maxWidth:345}}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    MY{/* This should be the first name od the owner/poster  */}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                
                title={product.title}
                subheader={product.createdAt}
            />

            <CardMedia
                component="img"
                height="194"
                image={product.images[0]} //upload images by multer
                alt="img not found"
            />
            
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    visual form of a document or a typeface without relying on meaningful content. 
                    Lorem ipsum may be used as a placeholder before final copy is availabl
                </Typography>

                <Typography> <span>Price : ${product.price} </span>  </Typography>
            </CardContent >

            <CardActions disableSpacing>




            { product.owner_id === userId  ?
                <Box>  
                <IconButton onClick={ (e)=> navigate(`/edit/${product._id}`)}> <EditIcon /></IconButton>
                <IconButton onClick={deleteHandler}> <DeleteIcon /></IconButton>
                </Box>:
                <Box>  
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={likeHandler} />
                    <p>{product.like}</p>
                </IconButton>
    
                <IconButton >
                    <ChatIcon />
                </IconButton>
                </Box>
            }

            
        



            {/* <StripePayment product={product}> </StripePayment> */}

            </CardActions>

        </Card>
    )
}
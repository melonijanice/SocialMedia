
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
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import PaymentIcon from '@mui/icons-material/Payment';
import moment from 'moment'
import StripePayment from './payment'


export default function Product(props) {


    // const {userId ,productsRenderFlag, setProductsRenderFlag} = useContext(UserContext)

    const {product ,productsRenderFlag, setProductsRenderFlag ,userId, LoggedInUser} = props
    const [likedBy, setLikedBy] = useState([])
    
    

    // const [updateProduct, setUpdateProduct] = useState({})
    // let loggedInUser = product.owner //+'1'



    const likeHandler = (e)=>{

        let newArr = likedBy

        function isLiked(userIdToCheck) {
            return userIdToCheck=== userId;
          }
        
        const isPrevLiked = newArr.find(isLiked)
        console.log("---->",newArr.find(isLiked))

        if(isPrevLiked){
            alert("you have already liked this item!")
            navigate("/user/marketplace")

        }
        else{

            newArr = [...newArr, userId]
            setLikedBy(newArr)
            console.log("likedBy",newArr)
    
    
            console.log("like was clicked for", product)
            let newObject = {...product}
            newObject = {...newObject, like:newObject.like+=1 }
            newObject = {...newObject, likedBy:newArr}
    
            console.log("newObject after like is updated",newObject)
    
            axios.put(`http://localhost:8000/api/product/${product._id}`, newObject) //{withCredentials:true} based on group project db
            .then(res =>{
                setProductsRenderFlag(!productsRenderFlag)
                console.log(" check if refresh is needed")
            })
            .catch( error => console.log(error))

        }


    }



    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/users/${product.owner_id}`,{},{withCredentials: true,})
    //     .then( res=>{
    //         console.log("from product",res.data)
    //     })
    // }, [])


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
        <Card sx={{ maxWidth:220  }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {/* {LoggedInUser.name[0]} */}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                
                title={product.title}
                // subheader={product.createdAt}
                subheader={moment(product.createdAt).format('MMMM Do YYYY, h:mm:ss a')}

            />

           {product.images.length!==0 ? <CardMedia
                component="img"
                height="194"
                image={`http://localhost:8000/Images/${product.images[0]}`} //upload images by multer
                alt="img not found"
            />:<CardMedia
            component="img"
            height="194"
            image={`http://localhost:8000/Images/Image_Not_Available.jpeg`} //upload images by multer
            alt="img not found"
        />} 
            
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    visual form of a document or a typeface without relying on meaningful content. 
                    Lorem ipsum may be used as a placeholder before final copy is availabl
                </Typography>

                <Typography> <span>Price : ${product.price} </span>  </Typography>
            </CardContent >

            <CardActions disableSpacing>




            { product.owner_id === userId  && userId ?
                <Box>  
                <IconButton onClick={ (e)=> navigate(`/user/marketplace/editProduct/${product._id}`)}> <EditIcon /></IconButton>
                <IconButton onClick={deleteHandler}> <DeleteIcon /></IconButton>
                </Box>
                :
                <Box>  
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon onClick={likeHandler} />
                    <p>{product.like}</p>
                </IconButton>
                <IconButton >
                    
                    {/* <ChatIcon  onClick={(e)=>{navigate(`/user/inbox/${product.owner_id}`)}}/> */}
                    {product.owner_id ?
                        <ChatIcon  onClick={(e)=>{navigate(`/user/inbox/${product.owner_id}`)}}/>
                        :
                        <ChatIcon  onClick={(e)=>{navigate("/user/inbox/All")}}/>
                    }

                </IconButton>

                <IconButton >
                    <StripePayment product={product} onSuccessProp={deleteHandler}> </StripePayment>
                </IconButton>
                </Box>
            }

            
        



            

            </CardActions>

        </Card>
    )
}

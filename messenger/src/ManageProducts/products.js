import React from 'react'
import {useState, useEffect, useContext} from 'react'
import Box from '@mui/material/Box';
import Navbar from "../Navigation/Navbar";
import Login from "../registration/Login";
import Button from '@mui/material/Button';
import axios from 'axios'
import Product from './product'
import {UserContext} from "../context"
import { navigate } from '@reach/router';
export default function ProductsComponent() {
    const [products, setProducts] = useState([])
    const [productsRenderFlag, setProductsRenderFlag] = useState(false)
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    const userId = localStorage.user && JSON.parse(localStorage.user).user_id;
    useEffect( ()=>{
        
        axios.get("http://localhost:8000/api/product") //,{} ,{withCredentials: true}
        .then(res=> 
            {
                console.log(res.data)
                setProducts(res.data)
            })
        .catch( err=>{
            console.log(err.message)
        })

    },[productsRenderFlag])

    // const {setFilteredProducts ,products} = useContext(UserContext)
    // const [displayProducts, setDisplayProducts]= useState([])

    return (<>
        <div>
       <Navbar />

        {
            userId?
            <Box                 
                component="form"
                onClick={(e)=> navigate("/user/marketplace/createProduct")}
                pt={3}
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
            autoComplete="off">
                <Button variant="contained" disableElevation fullWidth>
                    create a new product
                </Button>
            </Box>
            :
            null
        }

      </div>
        <div className="container ">
                <Box         
                    sx={{
                    display: 'flex',
                    flexWrap: 'wrap-reverse',
                    justifyContent: 'space-around',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    maxWidth: 1200,
                    }}>
                {
                    products.map( (individualProduct, index) =>(
                        <Box key={index}   sx={{
                            // marginLeft: {md: 25, lg:25 },
                            marginTop: {md: 5, lg:5 },
                        }} >
                            <Product 
                                product={individualProduct}
                                productsRenderFlag={productsRenderFlag}
                                setProductsRenderFlag={setProductsRenderFlag}
                                userId={userId}
                                LoggedInUser = {LoggedInUser}
                                
                            />
                        </Box>
                    ) ) 
                }
                </Box>




            
        </div>
        </>
    )
}



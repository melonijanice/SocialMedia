import React from 'react'
import {useState, useEffect, useContext} from 'react'
import Box from '@mui/material/Box';
import Navbar from "../Navigation/Navbar";
import Login from "../registration/Login";


import axios from 'axios'
import Product from './product'
import {UserContext} from "../context"


export default function ProductsComponent() {
    const [products, setProducts] = useState([])
    const [productsRenderFlag, setProductsRenderFlag] = useState(false)
    const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);
    const userId = localStorage.user && JSON.parse(localStorage.user).user_id;
   

    


    useEffect( ()=>{
        axios.get("http://localhost:8000/api/product") //,{} ,{withCredentials: true}
        .then(res=> setProducts(res.data))
        .catch( err=>{
            console.log(err.message)
        })

    },[productsRenderFlag])





    // const {setFilteredProducts ,products} = useContext(UserContext)
    // const [displayProducts, setDisplayProducts]= useState([])

    return (<>
        <div>
       <Navbar />

      </div>
        <div className="container ">
                <Box display="flex" justifyContent='space-around'>
                {
                    products.map( (individualProduct, index) =>(
                        <div key={index}>
                            <Product 
                                product={individualProduct}
                                productsRenderFlag={productsRenderFlag}
                                setProductsRenderFlag={setProductsRenderFlag}
                                userId={userId}
                                LoggedInUser = {LoggedInUser}
                                

                            />
                        </div>
                    ) ) 
                }
                </Box>




            
        </div>
        </>
    )
}



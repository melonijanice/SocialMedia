import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {UserContext} from '../context'
import {navigate, Router} from '@reach/router'
import ProductsComponent from '../ManageProducts/products'
import Register from "./Register";
import Logout from "../registration/Logout"
import Login from "../registration/Login";
import Messenger from "../Messenger/Messenger"
import Home from "./home"


export default function Marketplace() {



    const [isLoggedin, setLoggedin] = useState(false)
    const [userId, setUserId] = useState('')
    const [flag, setFlag] = useState(false)
    const [categories, setCategories]= useState([])
    const [categoryFlag, setCategoryFlag]= useState(false)
    const [products, setProducts] = useState([])
    const [productsRenderFlag, setProductsRenderFlag]= useState(false)


    useEffect( ()=>{
        axios.get("http://localhost:8000/api/product")
        .then(res=> setProducts(res.data))
        .catch( err=>{
            console.log(err.message)
        })

    },[productsRenderFlag])



    return (
        <div>

            <UserContext.Provider value={{
                products,
                productsRenderFlag, 
                setProducts,
                setProductsRenderFlag
            }}>
                <Router>
                    <Login path="/user/login/"/>
                    <Logout path="/user/logout/"/>
                    <Register path="/user/register"></Register>
                {/*     <Messenger path="/user/inbox"></Messenger> */}
                    <Messenger path="/user/inbox/:id"></Messenger>
                    <ProductsComponent path="/user/marketplace"></ProductsComponent>
                    <Home path="/user/home"/>

                </Router>

            </UserContext.Provider>
            
        </div>
    )
}

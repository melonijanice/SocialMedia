import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context";
import { navigate, Router } from "@reach/router";
import ProductsComponent from "../ManageProducts/products";
import Register from "./Register";
import Logout from "../registration/Logout";
import Login from "../registration/Login";
import Messenger from "../Messenger/Messenger";

import Home from "./home";

import CreateProduct from "../ManageProducts/createProduct";
import EditProduct from "../ManageProducts/editProduct";
// import RepliesToComments from "../Posts/RepliesToComments";

export default function Marketplace() {
  const [isLoggedin, setLoggedin] = useState(false);
  // const [userId, setUserId] = useState('')
  const [flag, setFlag] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryFlag, setCategoryFlag] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsRenderFlag, setProductsRenderFlag] = useState(false);
  const LoggedInUser = localStorage.user && JSON.parse(localStorage.user);

  return (
    <div>
      <UserContext.Provider
        value={
          {
            // products,
            // productsRenderFlag,
            // setProducts,
            // setProductsRenderFlag
          }
        }
      >
        <Router>
          <Login path="/user/login/" />
          <Logout path="/user/logout/" />
          <Register path="/user/register"></Register>
          <Messenger path="/user/inbox/:id"></Messenger>
          <ProductsComponent path="/user/marketplace"></ProductsComponent>

          <Home path="/user/home" />

          <CreateProduct path="/user/marketplace/createProduct">
            {" "}
          </CreateProduct>
          <EditProduct path="/user/marketplace/editProduct/:id"> </EditProduct>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

const productController = require("../controllers/products.controllers")
// const { authenticate } = require("../config/jwt.config")




module.exports = (app)=>{   
    
    app.get("/api/product" , productController.getProduct)
    app.post("/api/product" , productController.createProduct)//authenticate, authenticateAdmin
    app.delete("/api/product/:id", productController.deleteProduct)//authenticate
    app.put("/api/product/:id",  productController.updateProduct )//authenticate
    app.get("/api/product/:id", productController.getOneProduct )//authenticate

}


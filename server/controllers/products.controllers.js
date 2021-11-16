const Product = require("../models/products.model")
const multer = require('multer')



const productController = {
    getProduct: async (req, res)=>{
        const {product_id, title, price, description, content, images, category, checked, sold} = req.body;

        
            
        try {
            const products = await Product.find({})
            return(res.json(products))
            
        } catch (error) {
            return res.status(400).json(error)
            
        }
    },

    getOneProduct: async (req,res)=>{

        try{
            const product = await Product.findOne({_id:req.params.id})
            return(res.json(product))

        }catch(err){
            return res.status(400).json(error)
        }
    },


        


    createProduct: async (req, res)=>{
        const {owner_id, product_id, title, price, description, images, like} = req.body;

        console.log("createProduct",req.body)

        try {

            const product = await Product.findOne({product_id:product_id})
            if (product){
                return res.status(400).json({message: "The product already exists"})
            }

            // const newProduct = new Product(
            //     {
            //         owner_id:owner_id,
            //         product_id:product_id,
            //         title : title.toLowerCase(),
            //         price :price,
            //         description: description,
            //         images:images,
            //         like:like

            //     }
            // )

            // await newProduct.save()
            Product.create(req.body)
            res.json({message:"New product was created"})

            
        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    },

    deleteProduct: async (req, res)=>{
        try {
            await Product.findByIdAndRemove(req.params.id)
            res.json({message: "The product was deleted"})
        } catch (error) {
            res.status(400).json(error)
            
        }
    },
    updateProduct: async (req, res)=>{

        console.log(req.body)


        const { owner_id, product_id, title, price, description, content, images, like ,likedBy} = req.body;

        try {

            if(!images){
                return res.status(400).json({message: "No image was uploaded"})
            }

            await Product.findByIdAndUpdate(req.params.id, {
                owner_id:owner_id,
                product_id:product_id,
                title : title.toLowerCase(),
                price :price,
                description: description,
                content: content,
                images:images,
                like:like,
                likedBy:likedBy

            })
            res.json({ message: "A product was updated"})
            
        } catch (error) {
            return res.status(400).json(error)
            
        }
    },


    uploadImage: async (req, res) => {
        try {
            await res.send(req.file)
        } catch (error) {
            res.status(400).json(error)
        }
    },

    multipleFileUpload :async (req, res, next) => {
        try{
            let filesArray = [];
            req.files.forEach(element => {
                const file = {
                    fileName: element.originalname,
                    filePath: element.path,
                    fileType: element.mimetype,
                    fileSize: fileSizeFormatter(element.size, 2)
                }
                filesArray.push(file);
            });
            const multipleFiles = new Product({
                // title: req.body.title,
                images: filesArray 
            });
            await multipleFiles.save();
            res.status(201).send('Files Uploaded Successfully');
        }catch(error) {
            res.status(400).send(error.message);
        }
    }
 
}

module.exports = productController


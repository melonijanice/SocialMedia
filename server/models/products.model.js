const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    owner_id:{
        type:String,
    },
    
    product_id:{
        type:String,
        unique: true,
        trim:true,
        
        required: [true, "Product ID  is required"],
        minlength: [2, "Product ID must be greater than 6 characters"],
    },
    title:{
        type:String,
        trim:true,
        required: [true, "Title is required"],
        maxlength: [20, "Title must be smaller than 20 characters"],
    },
    price:{
        type:Number,
        trim:true,
        required: [true, "Price is required"],
        
    },
    description:{
        type:String,
        required: [true, "Description is required"],
        minlength: [2, "Description must be greater than 6 characters"],
    },
    content:{
        type:String,
        // required: [true, "Content is required"],
    },

    images:[Object],


    like:{
        type:Number,
        default: 0
    }

},{timestamps:true})

module.exports = mongoose.model("Product", productSchema)
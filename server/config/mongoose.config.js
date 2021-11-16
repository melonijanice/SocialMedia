const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/"+process.env.DB_NAME, { //creates a collection with this name
    useNewUrlParser: true, //flags needed for fallback options
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));



//Mehrdad connecting to DB usin URI
    // const mongoose = require('mongoose')

    // module.exports = (URI)=>{
    //     mongoose.connect(URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    
    //     })
    //     .then( ()=> console.log(`Established connection to the ${URI}`))
    //     .catch( () => console.log(`something went wrong connecting to ${URI}`))
    // }
//configure Express
require("dotenv").config();
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

//configure to accept and update cookies
app.use(cookieParser());

//Configure cors
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//connect to DB
require("./config/mongoose.config");

//configure socket
const socket = require("socket.io");

//required for post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//file upload
/* const fileUpload=require('express-fileupload')
app.use(fileUpload());
app.post('/upload',(req,res)=>
{
  if(req.files===null){
    return res.status(400).json({msg:'No file has been sent for upload'})
  }
  const file=req.files.file;
  file.mv(`${__dirname}/../client/public/uploads/${file.name}`,err=>{
    if(err)
    {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({fileName:file.name,filePath:`/uploads/${file.name}`})
  })
})
 */

//File-upload with multer
const multer = require("multer");
const path = require("path");
const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: `${__dirname}/Images/`, 
  filename: (req, file, cb) => {
    /*cb(null, file.originalname.replace(path.extname(file.originalname),"") + '_' + Date.now() 
       + path.extname(file.originalname))*/
       cb(null, file.originalname)
      // file.fieldname is name of the field (image)
      // path.extname get the uploaded file extension
}
});
const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}) 


/* var upload = multer({ dest: `${__dirname}/../client/public/uploads/` },
); */

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file) {
      console.log("File Uploaded",req.file.filename)
      res.json({
        fileName:req.file.filename,
        status: true,
        message: "File Uploaded!",
      });
    } else {
      console.log("File Not uploaded",req)
      res.status(400).json({
        status: false,
        data: "File Not Found :(",
      });
    }
  } catch (err) {
    console.log("Error",err)
    res.status(500).json(err);
  }
});

app.post("/api/remove", async (req, res) => {
  console.log(req.body.fileName);
  const fs = require("fs");
  let resultHandler = function (err) {
    if (err) {
      console.log(err);
      if (err.code === 'ENOENT') {
        res.json({
          status: true,
          message: "File did not exist, so no need to unlink!",
        });
      }
      else{
      res.status(400).json({
        status: false,
        data: "Delete Error",
      });
    }
    } else {
      res.json({
        status: true,
        message: "File Deleted!",
      });
    }
}

fs.unlink(`${__dirname}/Images/${req.body.fileName}`, resultHandler);
});

app.use(express.static('public'));  
app.use('/Images', express.static('Images')); 
//routes
require("./routes/user.routes")(app);


//listen on port
const port = process.env.MY_PORT;
//console.log(port)
//const port = 8000;
const server = app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
// We must also include a configuration settings object to prevent CORS errors

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

//socket configuration
io.on("connection", (socket) => {
  // NOTE: Each client that connects get their own socket id!
  // if this is logged in our node terminal, that means we a new client
  //     has successfully completed the handshake!
  console.log("socket id for handshake: " + socket.id);
  // We add our additional event listeners right inside this function
  // NOTE: "connection" is a BUILT IN events listener
  socket.on("added_pet", (data) => {
    console.log("added new pet:data is here:", data);
    console.log("socket id for Broadcast creation: " + socket.id);
    socket.broadcast.emit("pet_added", data);
  });
  socket.on("deleted_pet", (data) => {
    console.log("deleted new pet:data is here:", data);
    console.log("socket id for Broadcast deletion: " + socket.id);
    socket.broadcast.emit("pet_deleted", data);
  });
});

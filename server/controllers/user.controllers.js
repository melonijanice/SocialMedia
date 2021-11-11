
const UserManager = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


require("dotenv").config();

module.exports = {
  createUser: (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = req.body;
    console.log("recieved data for submit" + req.body);
    
    UserManager.findOne({ email: email })
      .then((user) => {
        if(user){
          
          res.status(400).send({errors:{
            unique: {
              unique: "ValidatorError",
              message: "User Email Already Exists",
              properties: {
                message: "User Email Already Exists"
              },
              kind: "unique",
              path: "unique"
            },
          }});
        }
        else{
          UserManager.create({
            firstName,
            lastName,
            email,
            password,
            confirmPassword
          })
            .then((user) => {
              res.json({ msg: "success!", user: user });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
          }
      })
      .catch((err) => res.status(400).json(err))
  },
  login: (req, res) => {
    console.log("Inside Login");
    UserManager.findOne({ email: req.body.email }).then((userRecord) => {
      if (userRecord === null) {
        // email not found in users collection
        return res.sendStatus(400);
        //res.Status(400).json({ message: "Invalid Login Attempt" });
      }
      else {
        console.log("before Bcrypt Login");

        bcrypt
          .compare(req.body.password, userRecord.password)
          .then((isPasswordValid) => {
            if (isPasswordValid) {
                console.log("Token",process.env.JWT_SECRET)
              // password wasn't a match!
              const userToken = jwt.sign(
                {
                  user_id: userRecord._id,
                  email: userRecord.email
                },
                process.env.JWT_SECRET
              );

              res
                .cookie("usertoken", userToken, process.env.JWT_SECRET, {
                  httpOnly: true,
                  expires: new Date(Date.now() + 900000),
                })
                .json({
                  msg: "successfully Logged In!",
                  userLoggedIn: {
                    name: userRecord.firstName + " " + userRecord.lastName,
                    user_id: userRecord._id,
                    email: userRecord.email
                  },
                });
            } else {
              res.sendStatus(400).json({ message: "Invalid Login Attempt" });
            }
          })
          .catch((err) => res.Status(401).json(err));
      }
    }); // if we made it this far, we found a user with this email address // let's compare the supplied password to the hashed password in the database // if we made it this far, the password was correct
    // note that the response object allows chained calls to cookie and json
  },
  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
  },
  getAll: (req, res) => {
    UserManager.find({})
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  getOne: (req, res) => {
    UserManager.findOne({ _id: req.params.id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  update: (req, res) => {
    const {
      firstName,
      lastName,
      email
    } = req.body;
    UserManager.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email
      },
      { new: true, runValidators: true } //return updated objects and run the validators that were used for update
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => {
        res.status(400).json(err);
        console.log("Error adding to DB at API");
        res.json(err);
      });
  },
  deleteUser: (req, res) => {
    UserManager.findByIdAndDelete(req.params.id)
      .then((deletedUser) => response.json(deletedUser))
      .catch((err) => res.json(err));
  },
  
};

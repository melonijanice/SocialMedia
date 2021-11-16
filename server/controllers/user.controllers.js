
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
              const userToken = jwt.sign(
                {
                  user_id: user._id,
                  email: user.email
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
                    name: user.firstName + " " + user.lastName,
                    user_id: user._id,
                    email: user.email
                  },
                });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
          }
      })
      .catch((err) => res.status(400).json(err))
  },
  login: (req, res) => {
  
    UserManager.findOne({ email: req.body.email }).then((userRecord) => {
      if (userRecord === null) {
        // email not found in users collection
        return res.sendStatus(400);
        //res.Status(400).json({ message: "Invalid Login Attempt" });
      }
      else {
     

        bcrypt
          .compare(req.body.password, userRecord.password)
          .then((isPasswordValid) => {
            if (isPasswordValid) {
               
              // password wasn't a match!
              const userToken = jwt.sign(
                {
                  user_id: userRecord._id,
                  email: userRecord.email,
                  following:userRecord.following
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
    .populate("followers following", "-password")
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  getOne: (req, res) => {
    UserManager.findOne({ _id: req.params.id })
    .populate('following')
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
   
        res.json(err);
      });
  },
  deleteUser: (req, res) => {
    UserManager.findByIdAndDelete(req.params.id)
      .then((deletedUser) => response.json(deletedUser))
      .catch((err) => res.json(err));
  },

  search: async (req, res) => {
    try {
      const users = await UserManager.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("name username avatar");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  follow: async (req, res) => {
    try {

      const user = await UserManager.find({
        _id: req.params.toFollow_id,
        followers: req.params.user_id,
      });
      if (user.length > 0)
        return res
          .status(500)
          .json({ message: "Already following this user." });

      const newUser = await UserManager.findOneAndUpdate(
        { _id: req.params.toFollow_id },
        {
          $push: { followers: req.params.user_id },
        },
        { new: true }
      ).populate("followers following", "-password");
        
      await UserManager.findOneAndUpdate(
        { _id: req.params.user_id },
        {
          $push: { following: req.params.toFollow_id },
        },
        { new: true }
      );

      return res.json({ 
        newUser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
 
  unfollow: async (req, res) => {
    try {
      const newUser = await UserManager.findOneAndUpdate(
        { _id: req.params.toFollow_id},
        {
          $pull: { followers: req.params.user_id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await UserManager.findOneAndUpdate(
        { _id: req.params.user_id },
        {
          $pull: { following: req.params.toFollow_id },
        },
        { new: true }
      );

      return res.json({ newUser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  suggestions: async (req, res) => {
    try {
      const user = await UserManager.find({
        _id: req.params.id
      });
      //const str = JSON.stringify(user[0].following).replace('[',"").replace(']',"").replace(/\"/g, "");
      //const user_following = str.split(',');
      
      const newArr = [...user[0].following, user[0]._id];
      const num = req.query.num || 10;
     
      const users = await UserManager.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: "usermanagers",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "usermanagers",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");
     
      return res.json({
        users,
        result: users.length,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
 
  
};

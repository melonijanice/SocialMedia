const MessageManager = require("../models/messages.model");
const { db } = require("../models/user.model");
const UserManager = require("../models/user.model");

module.exports.createMessage = (request, response) => {
  MessageManager.create(request.body)
    .then((message) => 
    
    {
      
      response.json(message)})
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.getContactedUsers = (request, response) => {
  /*  MessageManager.find(
    {
      $or: [{ toWhom: request.params.id }, { FromUser: request.params.id }],
    },
    { toWhom: 1, FromUser: 1, _id: 0 }
  ).populate("toWhom")
  .populate("FromUser")
    .then((message) => {
      response.json(message)
    })
    .catch((err) => response.json(err)); */

   /*  let toUsers=""
    UserManager.aggregate([
    {
      $lookup: {
        from: "messagemanagers",
        localField: "_id",
        foreignField: "FromUser",
        as: "frommessages",
      },
    },
    {
      $project: {
        frommessages_id: "$frommessages.toWhom",
        id: 1,
        firstName: 1,
      },
    },
  ]).then((message) => {
    toUsers=message
  })
  .catch((err) => response.json(err));
 
  UserManager.aggregate([
    {
      $lookup: {
        from: "messagemanagers",
        localField: "_id",
        foreignField: "toWhom",
        as: "frommessages",
      },
    },
    {
      $project: {
        frommessages_id: "$frommessages.FromUser",
        id: 1,
        firstName: 1,
        lastName:1,
        email:1
      },
    },
  ]).then((message) => {
    response.json([...toUsers,...message]);
  })
  .catch((err) => response.json(err)); */
 

 
   UserManager.aggregate([
    {
      $lookup: {
        from: "messagemanagers",
        as: "all_messages",
        let: { user_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ["$FromUser", "$$user_id"] },
                  { $eq: ["$$user_id", "$toWhom"] },
                ],
              },
            },
          },
        ],
      },
    },
  ])
    .then((message) => {
      const filteredUsers = message.filter(
        (item) => item.all_messages.length > 0
      );
      console.log(filteredUsers);
      response.json(filteredUsers);
    })
    .catch((err) => response.json(err));  
};

module.exports.getMessagesforUser = (request, response) => {
  MessageManager.find({
    toWhom: { $in: [request.params.to_id, request.params.from_id] },
    FromUser: { $in: [request.params.to_id, request.params.from_id] },
  })
    .populate("toWhom")
    .populate("FromUser")
    .sort({ updatedAt: "asc" })
    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};

module.exports.getAllMessagesforUser = (request, response) => {
  MessageManager.find({
    toWhom: request.params.to_id,
  })
    .populate("toWhom")
    .populate("FromUser")
    .sort({ updatedAt: "asc" })
    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};

module.exports.updateReadforUser = (request, response) => {
  MessageManager.updateMany(
    {
      toWhom: { $in: [request.params.to_id, request.params.from_id] },
      FromUser: { $in: [request.params.to_id, request.params.from_id] },
    },
    { Read: "True" },
    { new: true, runValidators: true } //return updated objects and run the validators that were used for update
  )
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => {
      response.status(400).json(err);
      console.log("Error adding to DB at API");
    });
};

module.exports.delete = (request, response) => {
  MessageManager.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.status(400).json(err));
};

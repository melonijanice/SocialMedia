const mongoose = require('mongoose');
const UserManager = require("../models/user.model");
const Schema = mongoose.Schema;
const MessageSchema = new mongoose.Schema({

  MessageBody: {
    type: String,
    required: [true, "Message is required"]
  },
  toWhom:[
    {
      type: Schema.Types.ObjectId,
      ref: UserManager,
    }
  ],
  FromUser:[
    {
      type: Schema.Types.ObjectId,
      ref: UserManager,
    }
  ],
}, {timestamps: true});


module.exports = mongoose.model('MessageManager', MessageSchema);
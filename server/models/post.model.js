const mongoose = require("mongoose");
const UserManager = require("../models/user.model");
const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema(
  {
    postBody: {
      type: String,
      required: [true, "Message is required"],
    },
    Image: { type: Array },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: UserManager,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: UserManager,
      },
    ],
    sharedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: UserManager,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("PostManager", PostSchema);

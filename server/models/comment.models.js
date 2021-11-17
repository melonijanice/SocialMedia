const mongoose = require("mongoose");
const UserManager = require("../models/user.model");
const PostManager = require("../models/post.model");
const Schema = mongoose.Schema;
const CommentSchema = new mongoose.Schema(
  {
    commentBody: {
      type: String,
      required: [true, "Message is required"],
    },
    commentedOn: {
      type: Schema.Types.ObjectId,
      ref: PostManager,
    },
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: UserManager,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: UserManager,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("CommentManager", CommentSchema);

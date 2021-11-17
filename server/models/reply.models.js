const mongoose = require("mongoose");
const UserManager = require("../models/user.model");
const PostManager = require("../models/post.model");
const CommentManager = require("../models/comment.models");
const Schema = mongoose.Schema;
const ReplySchema = new mongoose.Schema(
  {
    replyBody: {
      type: String,
      required: [true, "Reply is required"],
    },
    repliedOn: {
      type: Schema.Types.ObjectId,
      ref: CommentManager,
    },
    repliedBy: {
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
module.exports = mongoose.model("ReplyManager", ReplySchema);

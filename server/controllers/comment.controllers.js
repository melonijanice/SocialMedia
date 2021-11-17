const CommentManager = require("../models/comment.models");

module.exports.createComment = (request, response) => {
  console.log(request.body);
  CommentManager.create(request.body)
    .then((message) => response.json(message))
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.getComments = (request, response) => {
  CommentManager.find({})
    // .populate("commentedBy")
    .populate("commentedBy")
    .populate("commentedOn")
    .populate("likedBy")

    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};
module.exports.getCommentsById = (request, response) => {
  console.log(request.params.id);
  CommentManager.find({ commentedOn: request.params.id })

    // .populate("commentedBy")
    .populate("commentedBy")
    .populate("commentedOn")
    .populate("likedBy")

    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};
module.exports.delete = (request, response) => {
  CommentManager.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.status(400).json(err));
};

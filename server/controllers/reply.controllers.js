const ReplyManager = require("../models/reply.models");

module.exports.createReply = (request, response) => {
  console.log(request.body);
  ReplyManager.create(request.body)
    .then((message) => response.json(message))
    .catch((err) => {
      response.status(400).json(err);
    });
};
module.exports.getReplies = (request, response) => {
  ReplyManager.find({})
    .populate("repliedOn")
    .populate("repliedBy")
    .populate("likedBy")
    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};

module.exports.getRepliesById = (request, response) => {
  console.log(request.params.id);
  ReplyManager.find({ repliedOn: request.params.id })
    // .populate("commentedBy")
    .populate("repliedOn")
    .populate("repliedBy")
    .populate("likedBy")
    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};
// module.exports.getPosts = (request, response) => {
//     PostManager.find({})
//       .populate("toWhom")
//       .populate("likedBy")
//       .then((messages) => response.json(messages))
//       .catch((err) => response.json(err));
//   };

module.exports.delete = (request, response) => {
  CommentManager.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.status(400).json(err));
};

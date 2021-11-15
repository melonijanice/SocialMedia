const PostManager = require("../models/post.model");

module.exports.createPost = (request, response) => {
  console.log(request.body);
  PostManager.create(request.body)
    .then((message) => response.json(message))
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.getPosts = (request, response) => {
  PostManager.find({})
  .populate("postedBy")
    .populate("likedBy")
    .populate("sharedBy")
    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};


module.exports.delete = (request, response) => {
  PostManager.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.status(400).json(err));
};

const PostManager = require("../models/post.model");
const UserManager = require("../models/user.model");

module.exports.createPost = (request, response) => {
  PostManager.create(request.body)
    .then((message) => response.json(message))
    .catch((err) => {
      response.status(400).json(err);
    });
};
module.exports.updatePost = (request, response) => {
  PostManager.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true } //return updated objects and run the validators that were used for update
  )
    .populate("postedBy")
    .populate("likedBy")
    .populate("sharedBy")

    .then((updatedPost) => {
      response.json(updatedPost);
    })
    .catch((err) => {
      response.status(400).json(err);
      console.log("Error adding to DB at API");
      response.json(err);
    });
};

module.exports.getPost = (request, response) => {
  PostManager.findOne({ _id: request.params.id })
    .then((post) => response.json(post))
    .catch((err) => response.json(err));
};
module.exports.getPosts = (request, response) => {
  PostManager.find({})
    .populate("postedBy")
    .populate("likedBy")
    .populate("sharedBy")
    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};
module.exports.getFollowerPosts = (request, response) => {
  console.log(request.params.id);

  UserManager.findOne({ _id: request.params.id })
    .then((user) => {
      console.log(request.params.id)
      console.log(user._id)
      PostManager.find({postedBy: { $in: user.following }})
        .populate("postedBy")
        .populate("likedBy")
        .populate("sharedBy")
        .then((messages) => response.json(messages))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));

};

module.exports.delete = (request, response) => {
  PostManager.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.status(400).json(err));
};

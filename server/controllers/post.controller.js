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
      console.log(request.params.id);
      console.log(user._id);
      PostManager.find({
        postedBy: { $in: [...user.following, request.params.id] },
      })
        .populate("postedBy")
        .populate("likedBy")
        .populate("sharedBy")
        .then((messages) => response.json(messages))
        .catch((err) => response.json(err));
    })
    .catch((err) => response.json(err));
  //const str = JSON.stringify(user[0].following).replace('[',"").replace(']',"").replace(/\"/g, "");
  //const user_following = str.split(',');
};

module.exports.delete = (request, response) => {
  PostManager.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.status(400).json(err));
};

// Like Post
module.exports.likePost = async (request, response) => {
  try {
    const post = await PostManager.find({
      _id: request.params.postId,
      likedBy: request.params.id,
    });
    console.log("POST : ", post);
    console.log("POST LENGTH : ", post.length);

    if (post.length > 0)
      return result
        .status(400)
        .json({ message: "You already liked this post." });

    const like = await PostManager.findByIdAndUpdate(
      { _id: request.params.postId },
      {
        $push: { likedBy: request.params.id },
      },
      { new: true }
    );
    if (!like)
      return response
        .status(400)
        .json({ message: "This post does not exist." });

    return response.json({ message: "Liked post." });
  } catch (err) {
    return response.status(500).json({ err });
  }
};

// Unlike Post
module.exports.unlikePost = async (request, response) => {
  try {
    const like = await PostManager.findByIdAndUpdate(
      { _id: request.params.postId },
      {
        $pull: { likedBy: request.params.id },
      },
      { new: true }
    );

    console.log("UNLIKE : ", like);

    if (!like)
      return response
        .status(400)
        .json({ message: "This post does not exist." });

    return response.json({ message: "Unliked post." });
  } catch (err) {
    if (err) return response.status(500).json({ err });
  }
};

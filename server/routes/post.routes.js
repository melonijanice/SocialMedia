const PostController = require("../controllers/post.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = function (app) {
  app.post("/api/posts", authenticate, PostController.createPost);
  app.get("/api/posts", authenticate, PostController.getPosts);
  app.delete("/api/posts/:id", authenticate, PostController.delete);
  app.get("/api/posts/:id", authenticate, PostController.getPost);
  app.put("/api/posts/:id", authenticate, PostController.updatePost);
  app.get(
    "/api/posts/follower/:id",
    authenticate,
    PostController.getFollowerPosts
  );

  app.patch(
    "/api/posts/:postId/like/:id",
    authenticate,
    PostController.likePost
  );
  app.patch(
    "/api/posts/:postId/unlike/:id",
    authenticate,
    PostController.unlikePost
  );
};

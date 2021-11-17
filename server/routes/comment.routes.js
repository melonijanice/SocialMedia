const CommentController = require("../controllers/comment.controllers");
const { authenticate } = require("../config/jwt.config");
module.exports = function (app) {
  app.post("/api/comments", authenticate, CommentController.createComment);
  app.get("/api/comments", authenticate, CommentController.getComments);
  app.get("/api/comments/:id", authenticate, CommentController.getCommentsById);
  app.delete("/api/comments/:id", authenticate, CommentController.delete);
};

const ReplyController = require("../controllers/reply.controllers");
const { authenticate } = require("../config/jwt.config");
module.exports = function (app) {
  app.post("/api/reply", authenticate, ReplyController.createReply);
  app.get("/api/reply", authenticate, ReplyController.getReplies);
  app.get("/api/reply/:id", authenticate, ReplyController.getRepliesById);
  app.delete("/api/reply/:id", authenticate, ReplyController.delete);
};

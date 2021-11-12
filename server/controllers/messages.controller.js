const MessageManager = require("../models/messages.model");

module.exports.createMessage = (request, response) => {
  console.log(request.body);
  MessageManager.create(request.body)
    .then((message) => response.json(message))
    .catch((err) => {
      response.status(400).json(err);
    });
};

module.exports.getMessages = (request, response) => {
    MessageManager.find({})
    .then((messages) => response.json(messages))
    .catch((err) => response.json(err));
};

module.exports.delete = (request, response) => {
    MessageManager.findByIdAndDelete(request.params.id)
    .then((deletedBook) => response.json(deletedBook))
    .catch((err) => response.status(400).json(err));
};
const MessageController = require('../controllers/messages.controller');
const { authenticate} = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/messages',authenticate,MessageController.createMessage);
    app.get('/api/messages/:to_id/:from_id',authenticate,MessageController.getMessagesforUser);
    app.get('/api/messagesContacted',authenticate,MessageController.getContactedUsers);
    app.get('/api/messages/:to_id',authenticate,MessageController.getAllMessagesforUser);
    app.delete('/api/messages/:id',authenticate,MessageController.delete);
    app.put('/api/messages/:to_id/:from_id',MessageController.updateReadforUser);
    }
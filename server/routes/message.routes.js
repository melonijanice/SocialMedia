const MessageController = require('../controllers/messages.controller');
const { authenticate} = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/messages',authenticate,MessageController.createMessage);
    app.get('/api/messages',authenticate,MessageController.getMessages);
    app.delete('/api/messages/:id',authenticate,MessageController.delete);
    }
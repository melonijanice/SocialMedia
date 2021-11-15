const UserController = require('../controllers/user.controllers');
const { authenticate,authorize } = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/users',authenticate,UserController.createUser);
     app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.get('/api/users',authenticate,UserController.getAll);
    app.get('/api/users/:id',authenticate,UserController.getOne);
    app.put('/api/users/:id',authenticate,UserController.update);
    app.delete('/api/users/:id',authenticate,UserController.deleteUser); 
}
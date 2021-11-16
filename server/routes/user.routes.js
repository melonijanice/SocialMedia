const UserController = require('../controllers/user.controllers');
const { authenticate} = require('../config/jwt.config');
module.exports = function(app){
    app.post('/api/users',UserController.createUser);
     app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
    app.get('/api/users',authenticate,UserController.getAll);
    app.get('/api/users/:id',authenticate,UserController.getOne);
    app.put('/api/users/:id',authenticate,UserController.update);
    app.delete('/api/users/:id',authenticate,UserController.deleteUser); 
    app.get("/search", authenticate, UserController.search);
    app.put("/profile/:toFollow_id/:user_id/follow", UserController.follow);
    app.patch("/profile/:toFollow_id/:user_id/unfollow", authenticate, UserController.unfollow);
    app.get("/suggestions/:id", authenticate, UserController.suggestions);
    app.get("/search", authenticate, UserController.search);
}
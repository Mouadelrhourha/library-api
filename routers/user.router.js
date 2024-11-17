const router = require('express');
const routerUser = router();
const controllerUser= require('../controllers/user.controller');
const { middlewarePassword } = require('../middleware/password');
routerUser.use(middlewarePassword);
routerUser.get('/',controllerUser.getAllUsersHandler);
routerUser.post('/',controllerUser.addUserHandler);
routerUser.get('/:id',controllerUser.getUserByIdHandler);
routerUser.put('/:id',controllerUser.updateUserHandler);
routerUser.delete('/:id',controllerUser.deleteUserHandler);

module.exports={
  routerUser, 
};
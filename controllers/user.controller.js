const { user } = require('pg/lib/defaults');
const userService = require('../services/user.service');

const getAllUsersHandler = async function(req,res){
     
  const getUsers = await userService.getAlluser();
  res.json(getUsers);

};
const getUserByIdHandler= async function(req,res){
  const id=req.params.id;
  const getUsersById = await userService.getUserById(id);
  res.json(getUsersById);

};
const addUserHandler = async function(req,res){

  const user = req.body;
  const addedUser = await userService.addUser(user);
  res.json(addedUser);

};

const updateUserHandler = async function (req,res){

  const id=req.params.id;
  const user=req.body;
  const updatedUser = await userService.updateUser(id,user);
  res.json(updatedUser);
};

const deleteUserHandler = async function(req,res){
  const id=req.params.id;
  const deletedUser = await userService.deleteUser(id);
  res.json(deletedUser);

};

module.exports={
  getAllUsersHandler,getUserByIdHandler,addUserHandler,updateUserHandler,deleteUserHandler
};
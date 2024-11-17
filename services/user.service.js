const userRepository = require('../repositories/user.repository');
const getAlluser = async function(){

  return userRepository.getAllUsers(getAlluser);
};

const getUserById= async function(id){
  const userById = await userRepository.getUserById(id);
  const maj = userById.map((maj)=>maj.name=maj.name.toUpperCase());
  return userById;

};

const addUser = async function(user){
  return await userRepository.createUser(user);
};

const updateUser=async function(id , user){
  return await userRepository.updateUser(id , user);

};
const deleteUser=async function(id){

  return await userRepository.deleteUser(id);
};
module.exports={
  getAlluser,getUserById,addUser,updateUser,deleteUser
};

const { log } = require('debug/src/node');
const {client} = require('../database/database');
const { mapUserFromDataBase } = require('../utils/user.mapper');

const getAllUsers = async function(){

  const queryAllUser = await client.query('select id as "user_id",name ,email , joined_date from users');
  return queryAllUser.rows.map((row)=>mapUserFromDataBase(row));

};

const getUserById = async function(id){

  const queryById = await client.query('select id as "user_id",name ,email , joined_date from users where id=$1 ',[id]);
  console.log(queryById);
    
  return queryById.rows.map((row)=>{
    return {
      id : row.user_id,
      name : row.name,
      email : row.email,
      joinedDate : row.joined_date
    };
  });
};

const createUser = async function(user){

  const queryAddUser = ('insert into users (name , email , joined_date) values ($1,$2,$3) returning *');
  const values=[user.name,user.email,user.joined_date];
  const createdUserQuery = await client.query(queryAddUser,values);
  // console.log(createdUser);
  //  HDI TRI9A TNYA BCH DRNA RETURN MAP LUSER
  const createdUser = createdUserQuery.rows[0];
  const user_id = createdUser.id;   
  return mapUserFromDataBase({...createdUser,user_id});

};

const updateUser = async function (id , user){
  const queryUpdateUser = ('update users set  name=$1 , email=$2 , joined_date=$3 where id=$4  returning id as "user_id" , name , email , joined_date');
  const values=[user.name,user.email,user.joined_date,id];
  const updatedUser = await client.query(queryUpdateUser,values);
  // console.log(updatedUser);
    
  return updatedUser.rows.map((row)=>mapUserFromDataBase(row));

};
const deleteUser = async function(id){
  const queryDeleteUser = ('delete from users  where id=$1   returning id as "user_id" , name , email , joined_date');
  const deletedUser = await client.query(queryDeleteUser,[id]);
  // console.log(deletedUser);
  return deletedUser.rows.map((row)=>mapUserFromDataBase(row));

};
module.exports={
  getAllUsers,getUserById,updateUser,deleteUser,createUser
};
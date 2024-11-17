function mapUserFromDataBase(row){
  return {
    id : row.user_id,
    name : row.name,
    email : row.email,
    joinedDate : row.joined_date
  };
}

module.exports={

  mapUserFromDataBase	
};
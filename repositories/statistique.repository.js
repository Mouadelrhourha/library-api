const {client} = require('../database/database');

const findStatistique = async function(){

  const queryStatistique=(`
       select count(*),'hello' as hey  from users 
union 
select count(*),'hello' as hey  from borrows
union  
select count (*),'salam' as hey   from books
        `);

  const statistique= await client.query(queryStatistique);
  const allStatistique = statistique.rows;
  // 
  const usersCountResult = allStatistique[0];
  console.log(allStatistique);
  
  return {
    countUser :    usersCountResult.count,
    countBorrow :  allStatistique[1].count,
    countBook :    allStatistique[2].count

  };

};

module.exports={
  findStatistique
};
const { log } = require('debug/src/node');
const {client} = require('../database/database');
const { mapBookFromDataBase } = require('../utils/book.mapper');
const { mapUserFromDataBase } = require('../utils/user.mapper');

const getAllBorrow = async function(books,borrows){

  const getAllBorrowQuery = (`
            select 
                borrows.id as "borrow_id",
                users.id,
                users.name,
                users.email,
                users.joined_date,
                borrows.user_id,
                books.title,
                books.published_year as "publishedYear",
                books.category_id as "categoryId",
                categories.name as "categoryName",
                 borrows.borrow_date  ,
                borrows.return_date 
            from borrows
            join             
            users on borrows.user_id = users.id
            join 
            books on borrows.book_id = books.id
            join
            categories on books.category_id = categories.id
        `);
  const allBorrowQuery = await client.query(getAllBorrowQuery);
  // console.log(allBorrowQuery);
  return allBorrowQuery.rows.map((row)=> ({
    id : row.borrow_id,
    user : mapUserFromDataBase(row),
    book: mapBookFromDataBase(row),
    borrowDate : row.borrow_date,
    returnDate : row.return_date
  })
  );};
const getBorrowById =async function(id){

  const getBorrowByIdQuery=(`
        select
           borrows.id as "borrow_id",
           borrows.user_id,
           borrows.book_id,
           borrows.borrow_date,
           borrows.return_date,
           books.id,
           books.title,
           books.published_year as "published_Year",
           books.category_id as "categoryId",
           users.name,
           users.email,
           users.joined_date ,
           categories.name as "categoryName"

        from 
          borrows
         join 
           users on borrows.user_id = users.id
         join 
           books on borrows.book_id = books.id
         join
           categories on books.category_id= categories.id

         where borrows.id=$1`);
  const getBorrowId =await client.query(getBorrowByIdQuery,[id]);
  return getBorrowId.rows.map((row)=>({

    id : row.borrow_id,
    user : mapUserFromDataBase(row),
    book : mapBookFromDataBase(row),
    borrowDate : row.borrow_date,
    returnBorrow : row.return_date
  })
  );
};

const createBorrow = async function({user,book,borrow_date,return_date}){

  const queryAddBorrow = ('insert into borrows (user_id, book_id ,borrow_date,return_date) values ($1,$2,$3,$4)returning * ');
  const values=[user.id,book.id,borrow_date,return_date];
  const createdBorrow=await client.query(queryAddBorrow,values);
  const borrowCreated = createdBorrow.rows[0];
  return {
    id : borrowCreated.id,
    user,book,
    borrowDate : borrowCreated.borrow_date,
    returnDate : borrowCreated.return_date
  };

};

const updateBorrow = async({user,book,borrow_date,return_date},id)=>{
  const queryUpdate=('update borrows set user_id=$1,book_id=$2,borrow_date=$3, return_date=$4 where borrows.id=$5  RETURNING *');

  const values=[user.id,book.id,borrow_date,return_date,id];
  const updatedBorrow=await client.query(queryUpdate,values);
  return updatedBorrow.rows[0];

};

const deleteBorrow = async function (id) {
  const queryDelete=('delete from borrows where id=$1 returning * ');
  const values =[id];
  const deletedBorrow= await client.query(queryDelete,values);
  return deletedBorrow.rows[0];

};

const borrowCount = async function(){
  const queryborrowCount = (`
    select 
      book_id ,count(*) 
    from
      borrows
    group by book_id
    order by count(*) desc
    `);

  const getBorrowCount=await client.query(queryborrowCount);
  return getBorrowCount.rows;

};

const findBorrowedBookOfUser = async function(id){

  const queryBorrowedBookOfUser=(`
   select distinct 
    user_id , 
    book_id , 
    books.title ,
    books.category_id  as "categoryId",
    categories.name  as "categoryName"
   from borrows 
  join 
  users on user_id = users.id
  join 
  books on books.id = book_id
  join 
  categories on categories.id= books.category_id
  where user_id=$1
  `);

  const getBorrowedBookOfUser = await client.query(queryBorrowedBookOfUser,[id]);

  return getBorrowedBookOfUser.rows;
};

const borrowedBookByUserCount = async function(strDate,endDate){

  const query= (`
    select  user_id , users.name , users.email , users.joined_date , count(*)from borrows
    join 
    users on users.id = user_id
    where borrow_date>=$1 and return_date<= $2
    group by  user_id ,users.name , users.email , users.joined_date
    `);
  const values=[strDate,endDate];
  const getBorrowedBookOfUser = await client.query(query,values);
  // console.log(getBorrowedBookOfUser.rows);

  const resultat = getBorrowedBookOfUser.rows;
  console.log(resultat);

  return {

    user : resultat

  };
};

const findCatgorieesPolular = async function(){
  const queryFindCatgorieesPolular = (`
      select  category_id  , categories.name ,  count(*) from borrows
      join
      books on books.id=book_id
      join 
      categories on categories.id=books.category_id
      group by  category_id,categories.name
      order by category_id,categories.name
      `);
  const categoriesPolular = await client.query(queryFindCatgorieesPolular);
  return categoriesPolular.rows;
};

const findCountBorrowsByMonth = async function(){
  const query = `
    SELECT TO_CHAR(borrow_date, 'MM') AS month, COUNT(*) AS count
    FROM public.borrows
    GROUP BY month
    ORDER BY month;
  `;
  const result = await client.query(query);
  return result.rows;
};

const findTopBorrowingUsers = async function(){
  const query = `
     SELECT u.name,u.email, COUNT(br.id) AS borrowCount
     FROM public.borrows br
     JOIN public.users u ON br.user_id = u.id
     GROUP BY u.name,u.email
     ORDER BY borrowCount DESC
     LIMIT 10;
  `;
  const result = await client.query(query);
  return result.rows;
};

const findMostBorrowedBooks = async function(){
  const query = `
    SELECT b.title, COUNT(br.id) AS borrowCount
    FROM public.borrows br
    JOIN public.books b ON br.book_id = b.id
    GROUP BY b.title
    ORDER BY borrowCount DESC
    LIMIT 10;
  `;
  const result = await client.query(query);
  return result.rows;
};

module.exports={
  getAllBorrow,
  getBorrowById,
  createBorrow,
  deleteBorrow,
  borrowCount,
  findBorrowedBookOfUser,
  borrowedBookByUserCount,
  findCatgorieesPolular,
  updateBorrow,
  findCountBorrowsByMonth,
  findTopBorrowingUsers,
  findMostBorrowedBooks
};

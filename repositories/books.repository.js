const { Route, query } = require('express');
const { client } = require('../database/database');
const { log } = require('debug/src/browser');
const { getCategorieById } = require('./category.repository');
const { mapBookFromDataBase } = require('../utils/book.mapper');

const getBooks = async function(title,category){
  let queryBook =(`
     SELECT 
        books.id, 
        books.title, 
        books.published_year AS "publishedYear",
        categories.id AS "categoryId",
        categories.name AS "categoryName"
    FROM 
        books
    JOIN 
        categories ON books.category_id = categories.id  
    `);
  let values=[];
  if(title && category){
    queryBook+=(' where books.title = $1 AND categories.name=$2');
    values=[title,category];
  } else if (title){
    queryBook= queryBook+('where books.title=$1 ');
    values=[title];
  } else if (category){
    queryBook+=(' where categories.name=$1');
    values=[category];
  }
  const getBooksQuery= await client.query(queryBook,values);
  return getBooksQuery.rows.map((row)=>mapBookFromDataBase(row));
};

const createBook = async function(book,category){
  const queryAddBook=('insert into books (title , published_year , category_id) values($1,$2,$3) returning id,title , published_year as "publishedYear" , category_id as "categoryId"');
  const categoryId = category.id;
  const categoryName = category.name;
  const values=[book.title,book.publishedYear,categoryId];
  const createdBook =await client.query(queryAddBook,values);    
  return createdBook.rows.map((row)=>mapBookFromDataBase({...row,categoryName}));  
};

const getAvailablesBooks = async function(){
  const queryAvailableBook = (`
        SELECT 
            books.id, 
            books.title, 
            books.published_year AS "publishedYear",
            categories.id AS "categoryId",
            categories.name AS "categoryName"
        
        from 
            books

        join 
            categories on books.category_id = categories.id
        
        where 
        books.id in 
        (select distinct book_id from borrows where return_date < current_date )

        or 
        books.id
        not in 
        (select distinct(book_id) from borrows )
        
    `);
  const availableBooks= await client.query(queryAvailableBook);
  return availableBooks.rows.map((row)=>mapBookFromDataBase(row));
};

const getBookByid=async function(id){
  const queryBookById=(`
            select 
                books.id,
                books.title,
                books.published_year AS "publishedYear",
                categories.id as "categoryId",
                categories.name as "categoryName"
            from
                books
            join 
                categories on books.category_id  = categories.id
            where books.id=$1   `);

  const getBookId= await client.query(queryBookById,[id]);
  // console.log(getBookId.rows[0]);
    
  return getBookId.rows.map((row)=>{
    return {
      id: row.id,
      title : row.title,
      publishedYear : row.publishedYear,
      category : {
        id : row.categoryId,
        name : row.categoryName
      }
    };
  });
};

const deleteBook = async function(id){
  const queryDelete = (`
        delete from books
        where books.id=$1  returning id,title,published_year as "publishedYear" ,  category_Id as "categoryId" `);
  const deleteQuery = await client.query(queryDelete, [id]);
  return deleteQuery.rows.map((row)=>mapBookFromDataBase(row));
};
const updateBook = async function(id,book,category){
  const categoryId=category.id;
  const categoryName=category.name;
  const queryUpdate =(`
        update books set title=$1 ,published_year =$2,category_id=$3 where id=($4) returning id,title,published_year as "publishedYear" , category_id as "categoryId"
          `);
  const values=[book.title,book.publishedYear,categoryId,id];
  const updatedBook= await client.query(queryUpdate,values);
  return updatedBook.rows.map((row)=>mapBookFromDataBase({...row,categoryName}));
    
};
const findBookNotBorrowed = async function(){

  const queryBookNotBorrowed =(`

  SELECT books.id , title
  FROM books
  WHERE books.id NOT IN ( SELECT book_id FROM borrows )
  `);
  const bookNotBorrowed = await client.query(queryBookNotBorrowed);
  return bookNotBorrowed.rows;

};
module.exports={
  getBooks,createBook,getBookByid,deleteBook,updateBook,getAvailablesBooks,findBookNotBorrowed
};
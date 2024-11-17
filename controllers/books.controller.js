const { log } = require('debug/src/node');
const bookService =require('../services/books.service');

const getBookHandler =async function(req,res){
  const {title,category} = req.query;
  const getbook= await bookService.getBooks(title,category);
  res.json(getbook);    
};

const createBookHandler = async function (req,res) {
  const bookDto = req.body;
  const createdBook= await bookService.createBook(bookDto);
  res.json(createdBook);
};

const getBookByIdHandler = async function(req,res){
  const idBook =req.params.id;
  const getBook= await bookService.getBookById(idBook);
  res.json(getBook);

};

const deleteBookHandler = async function(req,res){

  const id=req.params.id;
  const deletedBook= await bookService.deleteBook(id);
  res.json(deletedBook);

};

const updateBookHandler= async function (req,res){
  const id= req.params.id;
  const bookToUpdate = req.body;
    
  const updatedBook = await bookService.updateBook(id,bookToUpdate);
  res.json(updatedBook);

};

const getAvailablesBooksHandler = async function(req,res){
  
  const bookAvailables= await bookService.getAvailablesBooks();
  res.json(bookAvailables);
  
};
const getBookNotBorrowedHandler = async function(req,res){
  
  const bookNotBorrowed= await bookService.getBookNotBorrowed();
  res.json(bookNotBorrowed);
  
};

module.exports=
{ 
  getBookHandler,createBookHandler,getBookByIdHandler,deleteBookHandler,updateBookHandler,getAvailablesBooksHandler,getBookNotBorrowedHandler

};
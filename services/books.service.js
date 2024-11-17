const { log } = require('debug/src/browser');
const { BadRequest, NotFound } = require('../exceptions');
const bookRepository = require('../repositories/books.repository');
const { getCategorieById } = require('../repositories/category.repository');
const { getCategoryByName } = require('./category.sevice');

const mapTitleToUpperCase = function(book){

  return book.title=book.title.toUpperCase();
};

const getBooks= async function(title,category){
  const getBook = await bookRepository.getBooks(title,category);
  const maj= getBook.map((book)=>mapTitleToUpperCase(book));
  return getBook;
};
/**
 * bookDto {
 *   title
 *   publishedYear
 *   category: "crime"
 * }
 */
const createBook = async function(bookDto){
    
  // crime
  const name = bookDto.category;
  // {id:"1",name: "crime"}
  const foundCategory = await getCategoryByName(name);

  const creatBook = await bookRepository.createBook(bookDto,foundCategory);
  const maj= creatBook.map((book)=>mapTitleToUpperCase(book));
  return creatBook; 
    
}; 

const getBookById = async function(id){

  const bookById = await bookRepository.getBookByid(id);
  const maj = bookById.map((book)=>mapTitleToUpperCase(book));
  return bookById;

};
const deleteBook = async function(id){
  const bookByid = await getBookById(id);
  const deletedBook =await bookRepository.deleteBook(id);
  return bookByid;
};

const updateBook = async function(id,bookToUpdate){

  const name =bookToUpdate.category;
  console.log(name);
    
  const foundCategory = await getCategoryByName(name);
  console.log(foundCategory);
    
  const updatedBook = await bookRepository.updateBook(id,bookToUpdate,foundCategory);
  const maj = updatedBook.map((book)=>mapTitleToUpperCase(book));

  return updatedBook;
};
const getAvailablesBooks=async function(){
  return await bookRepository.getAvailablesBooks();

};
const getBookNotBorrowed = async function(){

  return await bookRepository.findBookNotBorrowed();

};
module.exports={
  getBooks,createBook,getBookById,deleteBook,updateBook,mapTitleToUpperCase,getAvailablesBooks,getBookNotBorrowed
};
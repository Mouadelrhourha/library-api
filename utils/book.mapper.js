function mapBookFromDataBase(row){
  return {
    id : row.id ,
    title : row.title, 
    publishedYear : row.publishedYear,
    category:{
      id   :    row.categoryId,
      name :    row.categoryName
    }   
  };
}

module.exports={

  mapBookFromDataBase	
};
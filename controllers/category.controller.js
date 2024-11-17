
const { HttpError } = require('../exceptions');
const categoryService=require('../services/category.sevice');

const getAllCategoriesHandler = async function(req,res){
  try {
    const getCategory= await categoryService.getCategories();
    //console.log(getCategory);
    res.json(getCategory);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({message : error.message});
    } else {
      res.status(500).json({message : error.message});
    }
  }

};

const createdCategoryHandler = async function(req,res){
  try {
    const newCategory =req.body;
    // console.log(newCategory);
    const categoryCretaed = await categoryService.createCategory(newCategory);
    res.json(categoryCretaed);
  } catch (error) {
    if(error instanceof HttpError){
      res.status(error.status).json({message: error.message});
    } else{
      res.status(500).json({message: error.message});
    }
  }
};

const getCategorieByIdHandler = async function(req,res){
  try {
    const id=req.params.id;
    const cateById = await categoryService.categorieById(id);
    res.json(cateById);

  } catch (error) {
    if(error instanceof HttpError){
      res.status(error.status).json({message: error.message});
    } else{
      res.status(500).json({message: error.message});
    }
  }
};

const updateCategorieHandler = async function(req,res){
  const id=req.params.id;
  const newCategorie=req.body;
  //console.log(newCategorie);
  const categoryUpdated = await categoryService.categorieUpdate(id,newCategorie);
  res.json(categoryUpdated);
};
const deleteCategorieHandler = async function(req,res){
  const id=req.params.id;
  const categorieDeleted = await categoryService.categorieDelete(id);
  res.json(categorieDeleted);
};

const getPopularCategoriesHandler = async function(req,res){
  try {
    const categoriesPopular= await categoryService.getPopularCategories();
    res.json(categoriesPopular);
  } catch (error) {
    res.status(error.status ?? 500).json({message: error.message});
  }
};

module.exports={
  getPopularCategoriesHandler,
  getAllCategoriesHandler,createdCategoryHandler,getCategorieByIdHandler,updateCategorieHandler,deleteCategorieHandler
};

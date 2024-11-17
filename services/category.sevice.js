const { NotFound, DuplicatedException } = require('../exceptions');
const categoryRepository = require('../repositories/category.repository');
const { getAllCategories } = require('../repositories/category.repository');
const { addCategories } = require('../repositories/category.repository');

const getCategories = async function(){
  return await categoryRepository.getAllCategories();
};

const createCategory = async function(category) {
  // if(!name){
  //     throw new Error("le name et requis");
  // }
  const existeCategorie = await categoryRepository.getByName(category.name);
  if(existeCategorie){
    throw new DuplicatedException('categorie already exist');
  }
  const categoryCreate = await categoryRepository.addCategories(category);

  return categoryCreate;

};

const categorieById = async function(id){

  const foundCategorie = await categoryRepository.getCategorieById(id);
  if (!foundCategorie) {
    throw new NotFound('categorie not found ');

  }
  return foundCategorie;
};

const getCategoryByName = async function(name){

  const existeCategory = await categoryRepository.getByName(name);
  if (!existeCategory) {
    throw new NotFound(`categorie not found with name ${name} `);
  }
  return existeCategory;
};

const categorieUpdate= async function(id,category){
  return await categoryRepository.updateCategorie(id,category);
};
const categorieDelete = async function (id) {
  return await categoryRepository.deleteCategorie(id);
};

const getPopularCategories = async function(){
  return await categoryRepository.findPopularCategories();
};

module.exports={
  getCategories,createCategory,categorieById,categorieUpdate,categorieDelete,getCategoryByName,getPopularCategories
};

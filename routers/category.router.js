const router = require('express');
const categoryController = require('../controllers/category.controller');
const { middlewarePassword } = require('../middleware/password');
const categoryRouter = router();
categoryRouter.use(middlewarePassword);
categoryRouter.get('/popular',categoryController.getPopularCategoriesHandler);
categoryRouter.get('/',categoryController.getAllCategoriesHandler);
categoryRouter.post('/',categoryController.createdCategoryHandler);
categoryRouter.get('/:id',categoryController.getCategorieByIdHandler);
categoryRouter.put('/:id',categoryController.updateCategorieHandler);
categoryRouter.delete('/:id',categoryController.deleteCategorieHandler);

module.exports={
  categoryRouter,
};

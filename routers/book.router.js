const router = require('express');
const bookController = require('../controllers/books.controller');
const { middlewarePassword } = require('../middleware/password');
const bookRouter = router();
bookRouter.use(middlewarePassword);
bookRouter.get('/',bookController.getBookHandler);
bookRouter.get('/availables',bookController.getAvailablesBooksHandler);
bookRouter.get('/not-borrowed',bookController.getBookNotBorrowedHandler);

bookRouter.post('/',bookController.createBookHandler);
bookRouter.get('/:id',bookController.getBookByIdHandler);
bookRouter.delete('/:id',bookController.deleteBookHandler);
bookRouter.put('/:id',bookController.updateBookHandler);

module.exports={

  bookRouter
};
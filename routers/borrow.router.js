const router = require('express');
const borrowController = require('../controllers/borrow.controller');
const { middlewarePassword } = require('../middleware/password');
const borrowRouter = router();
borrowRouter.use(middlewarePassword);

borrowRouter.get('/',borrowController.getAllBorrowHandler);
borrowRouter.post('/',borrowController.createBorrowHandler);
borrowRouter.get('/count-borrow',borrowController.getBorrowCountHandler);
borrowRouter.get('/borrow-byuser',borrowController.getBorrowedBookByUserCountHandler);
borrowRouter.get('/categories-popular',borrowController.getCategoriesPopularHandler);
borrowRouter.get('/count-by-month',borrowController.getBorrowCountByMonthHandler);
borrowRouter.get('/top-borrowing-users',borrowController.getTopBorrowingUsersHandler);
borrowRouter.get('/most-borrowed-books',borrowController.getMostBorrowedBooksHandler);

borrowRouter.get('/:id',borrowController.getBorrowByIdHandler);
borrowRouter.get('/:id/borrowed-books',borrowController.getBorrowedBookOfUserHandler);

borrowRouter.delete('/:id',borrowController.deletedBorrowHandler);
borrowRouter.put('/:id',borrowController.updatedBorrowHandler);

module.exports={
  borrowRouter
};


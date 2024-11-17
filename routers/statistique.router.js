const router = require('express');
const statistiqueRouter = router();
const statistiqueController = require('../controllers/statistique.controller');

statistiqueRouter.get('/statistique',statistiqueController.getStatistiqueHandler);

module.exports={statistiqueRouter};
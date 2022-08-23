const { Router } = require('express');

const cardController = require('../controllers/cardController');

const router = new Router();

router.get('/lists/:id/cards', cardController.getAllByList);
router.get('/cards', cardController.getAll);
router.get('/cards/:id', cardController.getOne);

router.post('/cards', cardController.create);

router.patch('/cards/:id', cardController.update);

router.delete('/cards/:id', cardController.delete);

module.exports = router;
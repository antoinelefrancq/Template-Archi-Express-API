const { Router } = require('express');

const listController = require('../controllers/listController');

const router = new Router();

router.get('/lists', listController.getAll);
router.get('/lists/:id', listController.getOne);

router.post('/lists', listController.create);

router.patch('/lists/:id', listController.update);

router.delete('/lists/:id', listController.delete);

module.exports = router;
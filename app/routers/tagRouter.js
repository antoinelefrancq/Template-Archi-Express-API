const { Router } = require('express');

const tagController = require('../controllers/tagController');

const router = new Router();

router.get('/tags', tagController.getAll);
router.get('/tags/:id', tagController.getOne);

router.post('/tags', tagController.create);

router.patch('/tags/:id', tagController.update);

router.delete('/tags/:id', tagController.delete);

module.exports = router;
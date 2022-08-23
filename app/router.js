const { Router } = require('express');
const path = require('path')

const errorController = require('./controllers/errorController');
const listRouter = require('./routers/listRouter');
const cardRouter = require('./routers/cardRouter');
const tagRouter = require('./routers/tagRouter');

const router = new Router();

router.get('/', (req,res)=>{
    let filePath = path.join(__dirname, '../index.html')
    res.sendFile(filePath)
})

router.use(listRouter);
router.use(cardRouter);
router.use(tagRouter);

router.use((req, res, next) => {
  errorController._404(req, res);
  next(); // Utile si jamais il y a un middleware dans l'index.js après notre Router
});

module.exports = router;
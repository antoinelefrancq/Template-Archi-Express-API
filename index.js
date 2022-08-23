require('dotenv').config();
const express = require('express');
const router = require('./app/router');

//multer allow the requests pasts as form-data
const multer = require("multer");

//cors allow the requests to the API from the outside of our server 
const cors = require('cors');

const PORT  = process.env.PORT ||5505
const app = express();

//allow request on the body
app.use(express.urlencoded({extended:true}));
const multiparser = multer();
app.use(multiparser.none());

app.use(express.static('assets'));
app.use(cors());
app.use(router);

app.listen(PORT, _ =>{
    console.log(`API running on http://localhost:${PORT}`);
})
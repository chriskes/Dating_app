var nodemon = require('nodemon');
var validator = require('validator');
const express = require('express'); 
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.render('index.pug')
  })

app.listen(8000);
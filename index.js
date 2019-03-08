const nodemon = require('nodemon');
const validator = require('validator');
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
  res.render('index.pug')
})

app.get('/about', function (req, res) {
  res.render('about.pug')
})

app.use(function (req, res, next){
  res.status(404).sendFile(path.join(__dirname, '/static/404.html'));
})

app.listen(8000);
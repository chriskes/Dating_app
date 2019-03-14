//--------- REQUIRE PACKAGES ---------//
const validator = require('validator');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer'); 

const express = require('express');
const path = require('path');

const app = express();

//--------- INITIALIZE PUG TEMPLATING ENGINE ---------//
app.set('view engine', 'pug');

//--------- CREATE VIRTUAL PATH TO STATIC DIRECTORY ---------//
app.use('/static', express.static('static'));

//--------- HOME PAGE ---------//
app.get('/', function (req, res) {
  res.render('index.pug')
})

//--------- ABOUT PAGE ---------//
app.get('/about', function (req, res) {
  res.render('about.pug')
})

//--------- LOGIN PAGE ---------//
app.get('/login', function (req, res) {
  res.render('login.pug')
})

//--------- 404 ---------//
app.use(function (req, res, next){
  res.status(404).sendFile(path.join(__dirname, '/static/404.html'));
})

//--------- PORT ---------//
app.listen(8000);
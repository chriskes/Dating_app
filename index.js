//--------- REQUIRE PACKAGES ---------//
const validator = require('validator');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer'); 
const express = require('express');
const path = require('path');

var data = [
  {
    id: 'evil-dead',
    title: 'Evil Dead',
    plot: 'Five friends travel to a cabin in the …',
    description: 'Five friends head to a remote …'
  },
  {
    id: 'the-shawshank-redemption',
    title: 'The Shawshank Redemption',
    plot: 'Two imprisoned men bond over a number …',
    description: 'Andy Dufresne is a young and  …'
  }
]

const app = express()
  .use('/static', express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
;

function movies(req, res){
  res.render ('list.ejs', {data: data})
}

function movie(req, res, next){
  res.render('detail.ejs', {data: movie})
}

function notFound(req, res){
  res.status(404).render('not-found.ejs')
}


// //--------- HOME PAGE ---------//
// app.get('/', function (req, res) {
//   res.render('index.pug')
// })

// //--------- ABOUT PAGE ---------//
// app.get('/about', function (req, res) {
//   res.render('about.pug')
// })

// //--------- LOGIN PAGE ---------//
// app.get('/login', function (req, res) {
//   res.render('login.pug')
// })

// //--------- 404 ---------//
// app.use(function (req, res, next){
//   res.status(404).sendFile(path.join(__dirname, '/static/404.html'));
// })

//--------- PORT ---------//
app.listen(8000);
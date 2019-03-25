//--------- REQUIRE PACKAGES ---------//
const validator = require('validator');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const find = require('array-find');
var upload = multer({dest: 'client/upload/'})

var data = [{
  id: 'johan-keizer',
  name: 'Johan Keizer',
  age: '25',
  interests: 'Piet Mondriaan'
},
{
  id: 'alex-zwart',
  name: 'Alex Zwart',
  age: '34',
  interests: 'Pablo Picasso'
}
]

express()
  .use(express.static('client'))
  .use(bodyParser.urlencoded({extend: true}))
  .set('view engine', 'ejs')
  .set('views', 'server')
  .get('/', home)
  .get('/list', accounts)
  .get('/add', form)
  .get('/:id', account)
  .delete('/:id', remove)
  .post('/', upload.single('profile'), add)
  .use(notFound)
  .listen(8000)

function home(req, res) {
  res.render('home.ejs')
}

function accounts(req, res) {
  res.render('list.ejs', {data: data})
}

function account(req, res, next) {
  var id = req.params.id
  var detail = find(data, function (value) {
    return value.id === id
  })

//---------- Statement below prevents the callback from triggering twice, preventing error ----------//
  if (!account) {
    next();
    return;
  }

  res.render('detail.ejs', {data: detail})
}

function form(req, res) {
  res.render('add.ejs')
}

function add(req, res) {
  var id = slug(req.body.name).toLowerCase()

  data.push({
    id: id,
    name: req.body.name,
    profile: req.file ? req.file.filename : null,
    age: req.body.age,
    interests: req.body.interests
  })

  res.redirect('/' + id)
}

function remove(req, res) {
  var id = req.params.id

  data = data.filter(function (value) {
    return value.id !== id
  })

  res.json({status: 'ok'})
}

function notFound(req, res) {
  res.status(404).render('not-found.ejs')
}

//--------- REQUIRE PACKAGES ---------//
const validator = require('validator');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const find = require('array-find');
var upload = multer({dest: 'static/upload/'})

var data = [{
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

express()
  .use(express.static('client'))
  .use(bodyParser.urlencoded({extend: true}))
  .set('view engine', 'ejs')
  .set('views', 'server')
  .get('/', home)
  .get('/list', movies)
  .get('/add', form)
  .get('/:id', movie)
  .delete('/:id', remove)
  .post('/', upload.single('cover'), add)
  .use(notFound)
  .listen(8000)

function home(req, res) {
  res.render('home.ejs')
}

function movies(req, res) {
  res.render('list.ejs', {data: data})
}

function movie(req, res, next) {
  var id = req.params.id
  var movie = find(data, function (value) {
    return value.id === id
  })

//---------- Statement below prevents the callback from triggering twice, preventing error ----------//
  if (!movie) {
    next();
    return;
  }

  res.render('detail.ejs', {data: movie})
}


function form(req, res) {
  res.render('add.ejs')
}

function add(req, res) {
  var id = slug(req.body.title).toLowerCase()

  data.push({
    id: id,
    title: req.body.title,
    cover: req.file ? req.file.filename : null,
    plot: req.body.plot,
    description: req.body.description
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

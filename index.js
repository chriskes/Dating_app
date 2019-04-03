//--------- REQUIRE PACKAGES ---------//
const bodyParser = require('body-parser')
const multer = require('multer')
const express = require('express')
const MongoClient = require("mongodb").MongoClient; // source https://www.mongodb.com
const ObjectId = require("mongodb").ObjectID
require('dotenv').config()

//--------------------- START DB CONNECTION
let db = null;

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(dbUri, {
    useNewUrlParser: true
});

client.connect(error => {
    if (error) {
        console.log(error);
        throw error;
    }
    db = client.db(dbName);
});

const upload = multer({
  dest: 'client/upload/'});

express()
  .use(express.static('client'))
  .use(bodyParser.urlencoded({extend: true}))
  .set('view engine', 'ejs')
  .set('views', 'server')
  .get('/', home)
  .get('/list', accountlist)
  .get('/add', form)
  .get('/:id', account)
  .delete('/:id', remove)
  .post('/', upload.single('profile'), add)
  .use(notFound)
  .listen(8000)

function home(req, res) {
  res.render('home.ejs')
}

function accountlist(req, res) {
  db.collection('data').find().toArray(done)

function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('list.ejs', {
        data: data
      })
    }
  }
}

function account(req, res, next) {
  var id = req.params.id
  db.collection('persons').findOne({
    _id: mongo.ObjectID(id)
  }, done)

function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('detail.ejs', {
        data: data
      })
    }
  }
}

function form(req, res) {
    res.render('add.ejs')
  }

function add(req, res, next) {
    db.collection('data').insertOne({
      name: req.body.name,
      profile: req.file ? req.file.filename : null,
      age: req.body.age,
      interests: req.body.interests
    }, done)

function done(err, data) {
      if (err) {
        next(err)
      } else {
        res.redirect('/' + data.insertedId)
      }
    }
  }

function remove(req, res) {
    var id = req.params.id
    db.collection('data').deleteOne({
      _id: mongo.ObjectID(id)
    }, done)
  }  

function done(err) {
      if (err) {
        next(err)
      } else {
        res.json({
          status: 'ok'
        })
      }
    }
  
function notFound(req, res) {
    res.status(404).render('not-found.ejs')
  }
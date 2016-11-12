const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const port = 3009, port2 = 3000;
var db;

MongoClient.connect('mongodb://rizkiandrianto:Bismillah123!@ds151697.mlab.com:51697/simple-blog', (err, database) => {
  if (err) return console.log(err)
  db = database
})

app.use(bodyParser.urlencoded({extended: true}))
app.listen(port, function() {
  console.log('listening on ' + port);
})

app.get('/', function (req, res) {
  res.send('Welcome to Rizki\'s Blog')
})

app.post('/posts', (req, res) => {
  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.send('success')
  })
})

app.get('/posts', (req, res) => {
  db.collection('posts').find().toArray(function(err, results) {
    res.json(results);
  });
})

app.get('/posts/:id', (req, res) => {
  db.collection('posts').find({'_id': ObjectId(req.params.id)}).toArray(function(err, results) {
    res.json(results);
  });
})

app.delete('/posts/:id', (req, res) => {
  db.collection('posts').remove({'_id': ObjectId(req.params.id)}).then((result)=> {
    res.send('success deleting post with id ' + req.params.id);
  })
})

app.put('/posts/:id', (req, res) => {
  db.collection('posts').update({'_id': ObjectId(req.params.id)}, req.body, {upsert: true}).then((result)=> {
    res.send('success updating post with id ' + req.params.id);
  })
})

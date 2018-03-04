var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({extended: false});
var mongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var db;
mongoClient.connect('mongodb://127.0.0.1:27017', function(err, data){
    db = data.db('projector');
});

router.get('/', function(req, res){

    var html = fs.readFileSync('public/index.html', {encoding: 'utf-8'});
    res.send(html);

});

router.get('/all', function(req, res){
    var moviesCollection = db.collection('movie');

    moviesCollection.find().toArray(function(err, data){
        res.json(data);
    });
});

router.get('/:movieName', function(req, res){
    console.log(req.params.movieName);
    var moviesCollection = db.collection('movie');
    var query = {
                    "name" : req.params.movieName
                };
    console.log(query);
    moviesCollection.find(query).toArray((err, data)=>{
        console.log(data);
        res.json(data);
    });

});

router.post('/addMovie',urlEncoded,  function(req, res){
    var moviesCollection = db.collection('movie');

    var query = {
        "name" : req.body.name,
        "year" : req.body.year,
        "img" : req.body.img
    };
    console.log(query);
    moviesCollection.insert(query, (err, data)=>{
        console.log(data);
        if(!err){
            res.json({
                isSuccess : true
            });
        }
    });
    
});

module.exports = router;

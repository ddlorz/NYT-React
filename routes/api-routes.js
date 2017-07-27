const request = require('request');
const Article = require('../models/Article')
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = function(app) {
    app.post('/api/saved', function(req, res) {
        var newEntry = {
            title: req.body.lead_paragraph,
            date: moment().format('L'),
            link: req.body.web_url
        };
        var entry = new Article(newEntry);
        entry.save(function(err, doc) {
            if (err) console.log(err);
            res.end();
        });
    });

    app.get('/api/saved', function(req, res) {
        Article.find({}, function(err, doc) {
            if (err) console.log(err);
            else res.json(doc);
        })
    });

    app.delete('/api/saved/:id', function(req, res) {
        console.log(req.params.id);
        Article.findByIdAndRemove({'_id': req.params.id}, function(err, doc) {
            if (err) console.log(err);
            res.end();
        })
    });

    app.post('/api/search', function(req, res) {
        var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8c8884136e4f47a3a3ba08bfe7b9ff1b';
        url = url + '&q=' + req.body.topic + '&begin_date=' + req.body.start + '&end_date=' + req.body.end;
        console.log(url);

        request(url, function(error, response) {
            var nytResponse = JSON.parse(response.body).response.docs;
            res.json(nytResponse);
        });
    });

    app.post('/api/add_comment', function(req, res) {
        console.log(req.body)
        Article.findByIdAndUpdate(req.body.id, 
            { 
                '$push': {
                    comments: {comment: req.body.comment}                                        
                }
            }
        , function(err, doc) {
            if (err) console.log(err);
            res.end();
        });
    });

    app.get('/', function(req, res) {
        res.render('index', {});
    });
    

    
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const reactRouter = require('react-router');
const path = require('path');

const app = express();
const PORT = (process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.promise = Promise;
mongoose.connect('mongodb://localh')
var db = mongoose.connection;

db.on('error', function(err) {    
    console.log('Mongoose Error: ' + err);
    mongoose.connect('mongodb://heroku_j8nvp8qz:v1g0s4e8fojvo746eadtv828vv@ds041671.mlab.com:41671/heroku_j8nvp8qz')
});

db.once('open', function() {
    console.log('Successful connection to MongoDB');
});

require('./routes/api-routes')(app);

app.listen(PORT, function() {
    console.log('Listening to ' + PORT);
});
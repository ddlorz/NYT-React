const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    date: {
        type: String
    },
    link: {
        type: String,
        unique: true
    },
    comments: {
        type: Array
    }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
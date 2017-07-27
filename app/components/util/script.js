const axios = require('axios');

module.exports = {
    getSearch: function(searchData) {
        return axios.post('/api/search', searchData);
    },

    saveArticle: function(articles, id) {
        var x;
        for (let i in articles) {
            if (articles[i]._id === id) {
                x = i;
            }
        }
        return axios.post('/api/saved', articles[x]);
    },

    getArticles: function() {
        return axios.get('/api/saved');
    },

    deleteArticle: function(id) {
        console.log(id);
        return axios.delete('/api/saved/' + id);
    },

    addComment: function(comment, id) {
        return axios.post('/api/add_comment', {comment: comment, id: id});
    }
}
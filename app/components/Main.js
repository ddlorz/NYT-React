var React = require('react');

var Search = require('./Search');
var Saved = require('./Saved');
var Script = require('./util/script');
var moment = require("moment");

var Main = React.createClass({

    getInitialState: function() {
        return {
            articles: [],
            dbArticles: []
        };
    },

    deletePlaceholder: function() {
        var element = document.getElementById('placeHolder');
        element.parentElement.removeChild(element);
    },

    componentDidMount: function() {
        Script.getArticles().then((response) => {
            this.setState({
                dbArticles: response.data
            });
            console.log(this.state.dbArticles);
        });       
    },

    updateSaved: function() {
        Script.getArticles().then((response) => {
            this.setState({
                dbArticles: response.data
            });
            console.log(this.state.dbArticles);
        });      
    },

    submit: function(event) {
        event.preventDefault();

        var articles = {
            topic: document.getElementById('topic').value,
            start: moment(document.getElementById('start').value).format('YYYYMMDD'),
            end: moment(document.getElementById('end').value).format('YYYYMMDD')
        };
        console.log(articles);
        Script.getSearch(articles).then((response) => {
            console.log(response.data);
            this.setState({
                articles: response.data
            });
            this.deletePlaceholder();
        });
    },

    render: function() {
        let myComponent;
        if (this.state.dbArticles[0]) myComponent = <Saved dbArticles={this.state.dbArticles} update={this.updateSaved} />
        else myComponent = null

        return (   
            <div className='container'>  
                <div className='page-header text-center'>
                    <h1>New York Times</h1>
                </div>
                <div className='row'>
                    <div className='form-group col-md-6 col-md-offset-3'>
                        <label className='col-2 col-form-label'>Topic</label>
                        <div className='col-10'>
                            <input className='form-control' type='text' id='topic' />
                        </div><br />
                        <label className='col-2 col-form-label'>Start Year</label>
                        <div className='col-10'>
                            <input className='form-control' type='text' id='start' />
                        </div><br />
                        <label className='col-2 col-form-label'>End Year</label>
                        <div className='col-10'>
                            <input className='form-control' type='text' id='end' />
                        </div><br />
                        <button type="submit" className="btn btn-primary" id='submit' onClick={this.submit}>Search</button>
                    </div> 
                </div><br />
                <Search articles={this.state.articles} update={this.updateSaved} />
                {myComponent}
            </div>
        ); 
    }
});

module.exports = Main;

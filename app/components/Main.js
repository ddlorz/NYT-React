import React from 'react';
import moment from 'moment';

import Search from './Search';
import Saved from './Saved';

var Script = require('./util/script');

class Main extends React.Component{

    constructor () {
        super();
        this.state = {
            articles: [],
            dbArticles: []
        };
        this.deletePlaceholder = this.deletePlaceholder.bind(this);
        this.updateSaved = this.updateSaved.bind(this);
        this.submit = this.submit.bind(this);
    }

    deletePlaceholder () {
        var element = document.getElementById('placeHolder');
        element.parentElement.removeChild(element);
    }

    componentDidMount () {
        Script.getArticles().then((response) => {
            this.setState({
                dbArticles: response.data
            });
        });       
    }

    updateSaved () {
        Script.getArticles().then((response) => {
            this.setState({
                dbArticles: response.data
            });
        });      
    }

    submit (event) {
        event.preventDefault();
        
        var articles = {
            topic: document.getElementById('topic').value,
            start: moment(document.getElementById('start').value).format('YYYYMMDD'),
            end: moment(document.getElementById('end').value).format('YYYYMMDD')
        };
        Script.getSearch(articles).then((response) => {
            this.setState({
                articles: response.data
            });
            this.deletePlaceholder();
        });
    }

    render () {
        let saves;
        if (this.state.dbArticles[0]) saves = <Saved dbArticles={this.state.dbArticles} update={this.updateSaved} />
        else saves = null
        let searches;
        if (this.state.articles[0]) searches = <Search articles={this.state.articles} update={this.updateSaved} />
        else searches = null

        return (   
            <div className='container'>  
                <div className='page-header text-center'>
                    <h1 className='header'>New York Times</h1>
                </div>
                <div className='row'>
                    <div className='form-group col-md-6 col-md-offset-3'>
                        <label className='col-2 col-form-label title'>Topic</label>
                        <div className='col-10'>
                            <input className='form-control' type='text' id='topic' placeholder='Topic' />
                        </div><br />
                        <label className='col-2 col-form-label title'>Start Year</label>
                        <div className='col-10'>
                            <input className='form-control' type='text' id='start' placeholder='Start Year'/>
                        </div><br />
                        <label className='col-2 col-form-label title'>End Year</label>
                        <div className='col-10'>
                            <input className='form-control' type='text' id='end' placeholder='End Year' />
                        </div><br />
                        <button type="submit" className="btn btn-primary" id='submit' onClick={this.submit}>Search</button>
                    </div> 
                </div><br />
                {searches}
                {saves}
            </div>
        ); 
    }
};

export default Main;

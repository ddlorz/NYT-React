import React from 'react';

var Script = require('./util/script');

class Search extends React.Component{

    constructor () {
        super();
        this.saveArticle = this.saveArticle.bind(this);
    }

    saveArticle (event) {
        Script.saveArticle(this.props.articles, event.target.id);
        this.props.update();
    }

    render () {
        return (
            <div className='row'>
                <div className='col-md-8 col-md-offset-2'>
                    <div className='page-header text-center'><h4 className='title'>Search Results</h4></div> 
                    <h6 className='text-center' id='placeHolder'>No Results</h6>
                    <ul className='list-group'>                     
                        {this.props.articles.map((article) => {
                            return (
                                <li className='list-group-item' key={article._id + '__'}>
                                    <button className='btn btn-success left' key={article._id} onClick={this.saveArticle} id={article._id}>Save</button>
                                    <a href={article.web_url}>
                                        <h4 className='searchRes' key={article._id + '_'}>{article.snippet}</h4>
                                    </a>                                                                     
                                </li>
                            );
                        })}                    
                    </ul>
                </div>
            </div>
        ); 
    }
};

export default Search;

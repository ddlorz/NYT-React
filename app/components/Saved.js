import React from 'react';

var Script = require('./util/script');

class Saved extends React.Component{

    constructor () {
        super();
        this.state = {
            articles: []
        };
        this.deleteArticle = this.deleteArticle.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    deleteArticle (event) {
        Script.deleteArticle(event.target.id).then(() => {
            this.props.update();
        });        
    }

    addComment (event) {
        let id = event.target.id.replace('_add', '');
        let comment = document.getElementById(id + '_comment').value;
        Script.addComment(comment, id).then(() => {
            this.props.update();
        });
    }

    render () {
        return (
            <div className='row'>  
                <div className='col-md-8 col-md-offset-2'>    
                    <div className='page-header text-center'><h4 className='title'>Saved Articles</h4></div>              
                    <ul className='list-group' id='savedList'>                     
                        {this.props.dbArticles.map((dbArticle) => {
                            return (
                                <li className='list-group-item' key={dbArticle._id} id={dbArticle._id + '__'}>
                                    <button className='btn btn-danger left' key={dbArticle._id + '_'} onClick={this.deleteArticle} id={dbArticle._id}>Delete</button>
                                    <a href={dbArticle.link}>
                                        <h4 className='savedRes' key={dbArticle._id  + '__'}>{dbArticle.title}</h4>
                                    </a>
                                    <h6 className='date'>Date Saved: {dbArticle.date}</h6>                                        

                                    <input className='form-control' type='text' id={dbArticle._id + '_comment'} />
                                    <button className='btn btn-link btn-sm add' id={dbArticle._id + '_add'} onClick={this.addComment}>Add Comment</button><br />

                                    <div className='row' key={dbArticle._id + '___'}>                                           
                                        <div className='col-md-5 col-md-offset-2' key={dbArticle._id + '____'}>    
                                            <b className='text-center comment-header'>Comments</b>                      
                                            {dbArticle.comments.map((comment) => {
                                                return (                                                    
                                                    <h7 className='comment' key={comment.comment}>{comment.comment}</h7>
                                                );
                                            })}  
                                        </div>
                                    </div>           
                                </li>
                            );
                        })}    
                    </ul>
                </div> 
            </div>
        ); 
    }
};

export default Saved;

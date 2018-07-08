import React, { Component } from 'react';
import FullPost from '../Blog/FullPost/FullPost';
import NewPost from '../Blog/NewPost/NewPost';
import Posts from '../Blog/Posts/Posts';
import './Blog.css';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    render() {
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new-post">New</Link></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => { return <h1>Home!</h1>;}}/>
                <Route path="/" exact render={() => { return <h1>Home....</h1>;}}/> */}
                <Route path="/" exact component={Posts}/>
                <Route path="/new-post" component={NewPost}/>
            
                {/* <section>
                    <Posts/>
                </section> */}
                {/* <section>
                    <FullPost postId={this.state.selectedPostId} />
                </section> */}
                {/* <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;
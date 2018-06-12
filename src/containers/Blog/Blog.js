import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0, 10)
                    .map(p => {
                        return {
                            ...p,
                            author: "george"
                        }
                    });
                this.setState({
                    posts: posts,
                    error: false
                });
            })
            .catch((error) => {
                this.setState({
                    error: true
                });
            });
    }

    selectPostHandler = (postId) => {
        this.setState({
            selectedPostId: postId
        });
    }

    render() {

        const posts =
            this.state.error ?
                <p>Sorry, something went wrong</p>
                :
                this.state.posts.map(p => {
                    return (<Post
                        key={p.id}
                        author={p.author}
                        title={`${p.title.substring(0, 5)}...`}
                        clicked={this.selectPostHandler.bind(this, p.id)} />);
                });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
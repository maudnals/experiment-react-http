import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        console.log("updating state in componentDidMount")
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                const posts = response.data.slice(0, 10)
                    .map(p => {
                        return {
                            ...p,
                            author: "george"
                        }
                    });
                console.log(posts);
                this.setState({
                    posts: posts
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            posts: []
        });
    }

    selectPostHandler = (postId) => {
        this.setState({
            selectedPostId: postId
        });
    }

    render() {

        const posts = this.state.posts.map(p => {
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
import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import classes from './Posts.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Posts extends Component {

  state = {
    posts: [],
    error: false,
    loading: false
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
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
          error: false,
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  selectPostHandler = (postId) => {
    this.setState({
      selectedPostId: postId
    });
  }

  render() {
    const loadingIndicator = 
      this.state.loading?
        <p>Loading posts...</p>
        :
        null;
    const posts =
      this.state.error ?
        <p>Sorry, something went wrong</p>
        :
        this.state.posts.map(p => {
          return (
            <Link to={`/${p.id}`} key={p.id}>
              <Post
                author={p.author}
                title={`${p.title.substring(0, 5)}...`}
                clicked={this.selectPostHandler.bind(this, p.id)} />
            </Link>);
        });
    return (
      <section className={classes.Posts}>
        {loadingIndicator}
        {posts}
      </section>);
  }
}
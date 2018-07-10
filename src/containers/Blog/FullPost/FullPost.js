import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    };

    componentDidMount() {
        console.log('props', this.props);
        if (this.state.loadedPost && (this.props.match.params.id === this.state.loadedPost.id)) {
            return;
        }
        if (this.props.match.params.id) {
            axios.get(`/posts/${this.props.match.params.id}`)
                .then((response) => {
                    this.setState({
                        loadedPost: response.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    render() {
        let post = <p>Please select a Post!</p>;
        if (this.props.match.params.id && !this.state.loadedPost) {
            post = <p>Loading...</p>
        }
        else if (this.props.match.params.id && this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>Content</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        };
        return post;
    }
}

export default withRouter(FullPost);
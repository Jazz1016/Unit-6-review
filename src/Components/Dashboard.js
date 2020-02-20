import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PostDisplay from "./PostDisplay";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      userInput: ""
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get(`/api/post/${this.props.user.user_id}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({ userInput: e.target.value });
  };

  submitNewPost = () => {
    axios
      .post(`/api/post/${this.props.user.user_id}`, {
        post: this.state.userInput
      })
      .then(() => this.getPosts())
      .catch(err => console.log(err));
  };

  handleEdit = (post_id, text) => {
    axios
      .put(`/api/post/${post_id}`, { text })
      .then(() => {
        this.getPosts();
      })
      .catch(err => console.log(err));
  };

  handleDelete = post_id => {
    app
      //just needs post id
      .delete(`/api/post/${post_id}`)
      .then(() => {
        this.getPosts();
      })
      .catch(err => console.log(err));
  };

  render() {
    const mappedPosts = this.state.posts.map((post, index) => {
      return (
        <PostDisplay
          key={index}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          post={post}
        />
      );
    });
    return (
      <>
        <div className="input-container">
          <textarea
            id="new-post"
            cols="60"
            rows="2"
            placeholder="New post..."
            value={this.state.userInput}
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <button
            onClick={() => this.submitNewPost()}
            className="input-container-button"
          >
            Post
          </button>
        </div>

        <section className="app-body">
          <div className="padding" />
          <ul className="flex-vertical-center post-feed">{mappedPosts}</ul>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    user
  };
};

export default connect(mapStateToProps)(Dashboard);

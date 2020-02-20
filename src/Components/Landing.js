import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/reducer";
import { Link } from "react-router-dom";
import axios from "axios";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    //this.handleLogin = this.handleLogin.bind(this)
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = () => {
    axios
      .post(`/api/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        // get user off of redux
        this.props.getUser(res.data);
        this.props.history.push("/dash");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="app-body">
        <div className="input-container">
          <div className="flex-horizontal inputs">
            <div className="flex-vertical">
              <input
                maxLength="100"
                placeholder="Enter Email"
                name="email"
                onChange={e => {
                  this.handleInput(e);
                }}
              />
              <input
                type="password"
                maxLength="20"
                placeholder="Enter Password"
                name="password"
                onChange={e => {
                  this.handleInput(e);
                }}
              />
            </div>
            <button
              onClick={() => {
                this.handleLogin();
              }}
              className="input-container-button"
            >
              Log in
            </button>
          </div>
          <div className="flex-horizontal link">
            <span>Don't have an account? Register here: </span>
            <Link to="/register" className="input-container-button">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
//first parameter redux state, second param redux functions
export default connect(null, { getUser })(Landing);

import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../redux/reducer";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleRegister = () => {
    const { email, password } = this.state;
    axios
      .post(`/api/register`, { email, password })
      .then(res => {
        //TODO get user data
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
                onChange={
                  event => this.handleInput(event)

                  //something goes here
                }
              />
              <input
                type="password"
                maxLength="20"
                placeholder="Enter Password"
                name="password"
                onChange={
                  event => this.handleInput(event)

                  //something goes here
                }
              />
            </div>
            <button
              onClick={
                () => this.handleRegister()

                //something goes here
              }
              className="input-container-button"
            >
              Register
            </button>
          </div>
          <div className="flex-horizontal link">
            <span>Already have an account? login here: </span>
            <Link to="/" className="input-container-button">
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getUser })(Register);

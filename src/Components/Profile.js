import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../redux/reducer";

const Profile = props => {
  const logout = () => {
    axios.post(`/api/logout`).then(res => {
        props.logout()
        props.history.push('/')
    })
  };

  return (
    <div>
      <p>{props.user.user_id}</p>
      <p>{props.user.user_email}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

const mapStateToProps = (state) => {
    const { user } = state
    return {
        user
    }
    // return state
}

export default connect(mapStateToProps, { logout }) Profile;

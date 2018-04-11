import React, { Component } from "react";
//import { Router, Route, Link } from "react-router-dom";
import firebase from "firebase";

class Setting extends Component {
  logout() {
    firebase.auth().signOut();
    this.setState({ user: null });
  }
  render() {
    return <div className="col-md-12">
        <h2>Setting</h2>
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>;
  }
}

export default Setting;

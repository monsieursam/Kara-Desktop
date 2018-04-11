import React, { Component } from "react";
import { Button,Navbar, Nav } from "react-bootstrap";
import firebase from "firebase";
import { Router, Route, Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
  }
  newTextArea(e) {
    var userId = firebase.auth().currentUser.uid;
    let now = new Date();
    firebase
      .database()
      .ref("messages/")
      .push({ message: "", userId: userId, creation: now.getTime() });
  }
  render() {
    return <Navbar className="bg-info">
        <Navbar.Header>
          <Navbar.Brand>
            <a className="text-white font-weight-bold" href="#">
              Kara
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Form pullRight>
          <Button bsStyle="warning text-white" onClick={this.newTextArea}>
            Nouvelle note
          </Button>
        </Navbar.Form>
      </Navbar>;

      
  }
}
export default Header;

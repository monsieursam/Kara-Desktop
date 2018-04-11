import React, { Component } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import firebase from "firebase";
import { Router, Route, Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Navbar className="bg-info">
        <Navbar.Header>
          <Navbar.Brand>
            <a className="text-white font-weight-bold" href="#">
              Kara
            </a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
export default Header;

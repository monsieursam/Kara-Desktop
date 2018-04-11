import React, { Component } from "react";
import firebase from "firebase";
import { Button } from "react-bootstrap";
import "../index.css";

var config = {
  apiKey: "AIzaSyA-HWkPo9w7MXfCfPaIunvW27Q5Tyk2814",
  authDomain: "findsame-c7a3c.firebaseapp.com",
  databaseURL: "https://findsame-c7a3c.firebaseio.com",
  projectId: "findsame-c7a3c",
  storageBucket: "findsame-c7a3c.appspot.com",
  messagingSenderId: "792316823648"
};

firebase.initializeApp(config);

const provider = new firebase.auth.FacebookAuthProvider();

class Connexion extends Component {
  state = {
    user: null

  };

  async login() {
    const result = await firebase.auth().signInWithRedirect(provider);
    this.setState({ user: result.user });
    if(this.state.user){
        await firebase
          .database()
          .ref("users/" + this.state.user.uid)
          .set({
            username: this.state.user.displayName,
            email: this.state.user.email,
            profile_picture: this.state.user.photoURL
          });
        }
  }

  render() {
    return <div class="container">
        <h1 className="font-weight-bold text-light">
          Noter tout ce que vous voulez partout dans le monde avec notre
          cloud.
        </h1>
        <Button bsStyle="info" onClick={this.login.bind(this)}>
          Use Kara with Facebook
        </Button>
      </div>;
  }
};
export default Connexion;
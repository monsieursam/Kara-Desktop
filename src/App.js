import React from 'react';
import Home from "./Home";
import firebase from "firebase";
import Main from "./Main"
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user,
      });
    });
  }
  componentWillUnmount() {
    this.authSubscription();
  }
  render() { 
    if (this.state.loading) return null;
    // The user is an Object, so they're logged in
    if (this.state.user) return <Main />;
    // The user is null, so they're logged out
    return <Home />;
  }
}
export default App
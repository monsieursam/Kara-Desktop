import React, { Component } from "react";
//import { Router, Route, Link } from "react-router-dom";
import Setting from "../Setting";
import Header from "./Header"
import { Button,Navbar, Nav } from "react-bootstrap";
import _ from "lodash";
import firebase from "firebase";
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import ScrollArea from "react-scrollbar";
var lastopen = "";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    var userId = firebase.auth().currentUser.uid;
    let app = firebase
      .database()
      .ref("messages/" + userId + "/")
      .orderByChild("lastModif");
    app.on("value", snapshot => {
      this.getData(snapshot.val());
    });
  }

  getData(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(messageKey => {
        let cloned = _.clone(messagesVal[messageKey]);
        cloned.key = messageKey;
        if (cloned.open) {
          lastopen = cloned.key;
        }
        return cloned;
      })
      .value();
    this.setState({
      messages: messages
    });
  }
  handleChange(e, name) {
    console.log(e);
    console.log(e.target);
    var userId = firebase.auth().currentUser.uid;
    let dbCon = firebase
      .database()
      .ref("/messages/" + userId + "/" + name + "/");
    let now = new Date();
    dbCon.update({
      message: "" + e.target.innerHTML + "",
      lastModif: now.getTime()
    });
  }
  handleChangeName(e, name) {
    var userId = firebase.auth().currentUser.uid;
    let dbCon = firebase
      .database()
      .ref("/messages/" + userId + "/" + name + "/");
    let now = new Date();
    dbCon.update({ name: e.target.value, lastModif: now.getTime() });
  }
  handleClick(id) {
    let now = new Date();
    var userId = firebase.auth().currentUser.uid;

    if(lastopen != "supprimer"){
      let dbConu = firebase
        .database()
        .ref("/messages/" + userId + "/" + lastopen + "/");
      dbConu.update({ lastModif: now.getTime(), open: false });
    }
    

    let dbCon = firebase.database().ref("/messages/" + userId + "/" + id + "/");
    dbCon.update({
      lastModif: now.getTime(),
      open: true
    });
    lastopen = id;
  }
  deleteBouton(e) {
    var userId = firebase.auth().currentUser.uid;
    let now = new Date();
    let dbConu = firebase
      .database()
      .ref("/messages/" + userId + "/");
    dbConu.child(lastopen).remove();
    lastopen = "supprimer";
  }
  newTextArea(e) {
    let now = new Date();
    var userId = firebase.auth().currentUser.uid;
    if (lastopen != "supprimer") {
      let dbConu = firebase
        .database()
        .ref("/messages/" + userId + "/" + lastopen + "/");
      dbConu.update({ lastModif: now.getTime(), open: false });
    }

    var key = firebase
      .database()
      .ref("messages/" + userId)
      .push({
        name: "",
        message: "",
        creation: now.getTime(),
        open: true
      }).key;
    lastopen = key;
  }

  render() {
    const { visibleComponentKey, showAll } = this.state;
    let messageNodes = this.state.messages.map(message => {
      var a = "Sans titre";
      var open = "";
      if (message.name != "") {
        a = message.name;
      }
      if (message.open) {
        return (
          <div
            className="w-100 buttonWidth border bg-info text-white  p-4"
            key={message.key}
            onClick={e => this.handleClick(message.key)}
          >
            <p>{a}</p>
          </div>
        );
      } else {
        return <div className="w-100 buttonWidth  border p-4" key={message.key} onClick={e => this.handleClick(message.key)}>
            <p>{a}</p>
          </div>;
      }
    });

    messageNodes.reverse();

    let messageNodes2 = this.state.messages.map(message => {
      var userId = firebase.auth().currentUser.uid;
      if (message.open) {
        return (
          <div className="bg-white" key={message.key}>
            <form>
              <input
                className="border-0 w-100 inputName bg-white p-4"
                placeholder="Nom de la note"
                value={message.name}
                onChange={e => this.handleChangeName(e, message.key)}
              />
              <ReactQuill
                theme="snow"
                className="editeur bg-white border-0"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    ["image", "code-block"]
                  ]
                }}
                theme="snow"
                value={message.message}
                onKeyUp={e => this.handleChange(e, message.key)}
              />
            </form>
          </div>
        );
      }
    });
    messageNodes2.reverse();
    const { openedMessage } = this.state;
    return <div className="h-100 bg-white">
        <div className="h-100">
          <div className="w-75 bloccontainer dragscroll p-4 bg-white">
            <div className="p-0 h-25 float-left">
              <Button bsStyle="warning" className="m-2 text-white " onClick={this.newTextArea.bind(this)}>
                Nouvelle note
              </Button>
            </div>
            <div className="p-0 h-25 float-right">
              <Button bsStyle="danger" className="m-2 text-white " onClick={this.deleteBouton.bind(this)}>
                Supprimer
              </Button>
            </div>
            <div className="bg-white bloccontain ">{messageNodes2}</div>
          </div>
          <div className="w-25 navigation bg-light">
            <h2 className="p-3">Mes notes</h2>
            <ScrollArea className="area" speed={0.8}>
              {messageNodes}
            </ScrollArea>
          </div>
        </div>
      </div>;
  }
}

export default Main;

// WEBPACK FOOTER //
// ./src/Main/index.js

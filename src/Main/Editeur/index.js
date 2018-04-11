import React, {Component} from 'react';
import _ from 'lodash';
import firebase from "firebase";
import Editor from "react-medium-editor";
import { Fade } from 'react-bootstrap';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      open: true
    };
    var userId = firebase.auth().currentUser.uid;
    let app = firebase
      .database()
      .ref("messages")
      .orderByChild("creation");
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
          return cloned;
        
      })
      .value();
    this.setState({
      messages: messages
    });
  }
  getThisUser(){
    var userId = firebase.auth().currentUser.uid;
    var a = this.state.messages;
    var b = [];
    a.forEach(function(e){
      console.log(e.userId == userId);
      if(e.userId == userId ){
        b.push(e);
      }
    })
    this.setState({ messages: b });
  }
  handleChange(e,name) {
    console.log(name)
    var userId = firebase.auth().currentUser.uid;
      let dbCon = firebase.database().ref("/messages/" + name);
      let now = new Date();
      dbCon.update({ message: e, userId: userId, lastModif: now.getTime() });
  }
  render() {
    let messageNodes = this.state.messages.map(message => {
    var userId = firebase.auth().currentUser.uid;
      if(userId == message.userId){
        return <div className="container-fluid">
            <Editor className="p-2 mt-2 border border-light rounded card" text={message.message} onChange={e => this.handleChange(e, message.key)} options={{ toolbar: { allowMultiParagraphSelection: true, buttons: ["bold", "italic", "underline", "anchor", "h2", "h3", "quote"], diffLeft: 0, diffTop: -10, firstButtonClass: "medium-editor-button-first", lastButtonClass: "medium-editor-button-last", relativeContainer: null, standardizeSelectionStart: false, static: false /* options which only apply when static is true */, align: "center", sticky: false, updateOnEmptySelection: false }, placeholder: { /* This example includes the default options for placeholder,
           if nothing is passed this is what it used */
                  text: "", hideOnClick: true } }} />
          </div>;
      }
    });
    messageNodes = messageNodes.reverse();
    return <div className="row">{messageNodes}</div>;
  }
}

export default MessageList

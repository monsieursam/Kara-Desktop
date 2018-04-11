import React, { Component } from "react";
import _ from "lodash";
import firebase from "firebase";
import { Fade, Button } from "react-bootstrap";
import Setting from "../..//Setting";

class MenuGauche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
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
  handleClick(id){
    
  }
  render() {
    let messageNodes = this.state.messages.map(message => {
      var userId = firebase.auth().currentUser.uid;
      if (userId == message.userId) {
        return (
          <div className="container">
            <Button onClick={e=>this.handleClick(message.key)}>
              {message.key}
            </Button>
          </div>
        );
      }
    });
    messageNodes = messageNodes.reverse();
    return (
      <div className="">
        {messageNodes}
        yo <Setting />
      </div>
    );
  }
}

export default MenuGauche;

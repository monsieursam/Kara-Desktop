import React, { Component } from "react";
import Connexion from "./Connexion";
import Header from "../Header";
import {Image,Thumbnail } from "react-bootstrap";

class Home extends Component {
  render() {
    return <div>
        <div className="backgroundImage container-fluid d-flex align-items-center text-center">
          <div className="container">
            <Connexion />
          </div>
        </div>
        <div className="container-fluid bg-white partie2 p-4 ">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="p-3 m-2 rond bg-light">
                <img src="http://rbbideas.com/wp-content/uploads/2017/03/stock-vector-woman-user-smartphone-design-flat-computer-user-icon-social-media-web-user-phone-web-phone-398677477-1-1.png" className="w-50" />
                <p>
                  Garder toutes vos notes dans un mêmes endroit tout simplement grâce à notre affichage simplifié et notre visualisation en direct
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 m-2 rond bg-light">
                C'est totalement gratuit, vous pouvez vous connecter dès à présent grâce à votre compte Facebook
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="p-3 m-2 rond bg-light">
                Emporter vos notes partout ou vous allez grâce à notre Cloud{" "}
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Home;

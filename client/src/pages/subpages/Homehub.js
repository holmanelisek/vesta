import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";

class Homehub extends Component {
  state = {
    isSignedIn: false,
  };

  handleAuth = () => {
    // API.isSignedIn()
    // .then(res => {
    //   console.log(res.data);
      if(this.state.isSignedIn){
        console.log("True");
        return (
          <div>
            <h1>Home Hub</h1>
          </div>
        )
      }else{
        console.log("False");
        return (<Redirect to="/"/>);
      }
    // }).catch(err => {

    // })
  }

  //Function to change the state values on input change
  handleInputChange = event => {

  };
  
  render() {
      if(this.props.authenticated){
        return (
            <div style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }} className="jumbotron bg-light">
              <h1>Home Hub</h1>
            </div>
        );
      }else{
        return (<Redirect to="/"/>);
      }
    }

  }
  
  export default Homehub;
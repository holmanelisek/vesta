import React, { Component } from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";

class Admin extends Component {
    state = {
      isSignedIn: true
    };
  
    // componentDidMount(){
    //   API.isSignedIn()
    //   .then(res => {
    //     if(!res.email){
    //       this.setState({isSignedIn: true})
    //     }
    //   }).catch(err => {

    //   })
    // }

    //Function to change the state values on input change
    handleInputChange = event => {

    };
  
    render() {
      if(!this.state.isSignedIn){
        return (<Redirect to="/"/>)
      }
      return (
          <div>
            <div style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }} className="jumbotron bg-light">
              <h1>Home Hub</h1>
            </div>
          </div>
      );
    }
  }
  
  export default Admin;
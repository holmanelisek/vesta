import React, { Component } from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";

class NoMatch extends Component {
    render() {
      return (
          <div>
            <div style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }} className="jumbotron bg-light">
              <h1>404: Not Found</h1>
            </div>
          </div>
      );
    }
  }
  
  export default NoMatch;
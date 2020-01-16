import React, { Component } from "react";

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
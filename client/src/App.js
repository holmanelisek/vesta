import React from 'react';
import Home from "./pages/home";
import Admin from "./pages/admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Import for templste code.
//import logo from './logo.svg';
//import './App.css';

function App() {
  <Router>
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Admin} />
      <Route component={NoMatch} />
    </Switch>
  </div>
  </Router>


  //Template Code to test if react ran correctly
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  );
}

export default App;

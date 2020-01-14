import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollspyNav from "react-scrollspy-nav";

function App() {
  return (
    <Router>
      <div>
        {/* <ScrollspyNav
            scrollTargetIds={["about","services","team"]}
            offset={-56}
            activeNavClass="is-active"
            scrollDuration="400"
            headerBackground="true"
        > */}
          <Navbar />
        {/* </ScrollspyNav> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/admin" component={Admin}/>
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

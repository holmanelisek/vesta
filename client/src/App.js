import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import ScrollspyNav from "react-scrollspy-nav";

function App() {
  return (
    <Router>
      <div>
        <ScrollspyNav
            scrollTargetIds={["section_1", "section_2", "section_3"]}
            offset={-56}
            activeNavClass="is-active"
            scrollDuration="100"
            headerBackground="true"
        >
          <Navbar />
        </ScrollspyNav>
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/admin" component={Admin}/>
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

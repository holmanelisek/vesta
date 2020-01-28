import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Vesta from "./pages/Vesta";

function App() {
  return (
    <Router>
      <div>
          <Route component={Vesta} />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Index from "./pages/Index";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
    </Router>
  );
}

export default App;

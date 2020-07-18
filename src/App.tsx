import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import {
  AuthProvider,
  BillsProvider,
  LoadingProvider,
  MyBillsProvider,
} from "./stores";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <BillsProvider>
        <LoadingProvider>
          <MyBillsProvider>
            <Router>
              <Routes />
            </Router>
          </MyBillsProvider>
        </LoadingProvider>
      </BillsProvider>
    </AuthProvider>
  );
}

export default App;

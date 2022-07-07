import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <ToastContainer pauseOnFocusLoss />
      <Routes />
    </Router>
  );
}

export default App;

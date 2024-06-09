import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./component/Modal/ModalContext";
import ObrolanGrup from "./component/Modal/ObrolanGrub";

ReactDOM.render(
  <Router>
    <ModalProvider>
      <App />
      {/* <ObrolanGrup /> */}
    </ModalProvider>
  </Router>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./Services/AuthContent";

ReactDOM.render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>,
  document.getElementById("root")
);

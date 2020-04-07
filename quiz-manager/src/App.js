import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import About from "./Components/About";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/About" component={About} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/SignIn";
import About from "./Components/About";
import QuizList from "./Components/QuizList";
import Admin from "./Components/Admin";
import NotFound from "./Components/NotFound";
import AddQuiz from "./Components/QuizCreate";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/SignIn" exact component={SignIn} />
            <Route path="/About" component={About} />
            <Route path="/Quiz" component={QuizList} />
            <Route path="/Add" component={AddQuiz} />
            <Route path="/Admin" component={Admin} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

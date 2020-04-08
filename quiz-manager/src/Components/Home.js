import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="homeContainer">
      <h1>Welcome to Quiz Manager</h1>
      <p>Please Sign in to access a Quiz</p>

      <Link to="/SignIn">
        <button className="btn signInButton">Sign in</button>
      </Link>
    </div>
  );
}

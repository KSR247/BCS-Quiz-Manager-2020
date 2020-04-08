import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Link to="/NotFound">Forgot your password?</Link>
          <button>Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To Start a quiz pleasae login in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

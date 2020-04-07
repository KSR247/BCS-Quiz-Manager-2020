import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <Link to="/" className="nav-link">
              <span className="link-text logo-text">Quiz Manager</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link">
              <span className="link-text">Home</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Quiz" className="nav-link">
              <span className="link-text">Quiz</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/About" className="nav-link">
              <span className="link-text">About</span>
            </Link>
          </li>

          <li className="nav-item" id="themeButton">
            <Link to="/SignIn" className="nav-link">
              <span className="link-text">SIGN IN</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

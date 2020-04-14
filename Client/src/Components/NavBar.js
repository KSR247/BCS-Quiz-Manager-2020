import React, { useContext, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Services/AuthContent";
import AuthService from "../Services/AuthService";

export default function NavBar(props) {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const onClickLogout = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const autenticatedNavBar = () => {
    return (
      <Fragment>
        <li className="nav-item">
          <NavLink
            to="/Quiz"
            activeStyle={{
              fontWeight: "bold",
              backgroundColor: "rgb(66, 106, 250)",
            }}
            className="nav-link"
          >
            <span className="link-text">Quiz</span>
          </NavLink>
        </li>
        {user.role === "admin" ? (
          <li className="nav-item">
            <NavLink
              to="/Admin"
              activeStyle={{
                fontWeight: "bold",
                backgroundColor: "rgb(66, 106, 250)",
              }}
              className="nav-link"
            >
              <span className="link-text">Admin</span>
            </NavLink>
          </li>
        ) : null}
        <li className="nav-item" id="themeButton">
          <Link to="/" className="nav-link">
            <button className="button" type="button" onClick={onClickLogout}>
              <span className="link-text">Logout</span>{" "}
            </button>
          </Link>
        </li>
      </Fragment>
    );
  };
  const unAutenticatedNavBar = () => {
    return (
      <Fragment>
        <li className="nav-item" id="themeButton">
          <NavLink
            to="/"
            activeStyle={{
              fontWeight: "bold",
              backgroundColor: "rgb(66, 106, 250)",
            }}
            className="nav-link"
          >
            <button className="button" type="button">
              <span className="link-text">Sign In</span>{" "}
            </button>
          </NavLink>
        </li>
      </Fragment>
    );
  };
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <NavLink to="/" className="nav-link">
              <span className="link-text logo-text">Quiz Manager</span>
            </NavLink>
          </li>
          {!isAuthenticated ? unAutenticatedNavBar() : autenticatedNavBar()}
          <li className="nav-item">
            <NavLink
              to="/About"
              activeStyle={{
                fontWeight: "bold",
                backgroundColor: "rgb(66, 106, 250)",
              }}
              className="nav-link"
            >
              <span className="link-text">About</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

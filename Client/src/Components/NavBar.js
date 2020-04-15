import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../Services/AuthContent";
import AuthService from "../Services/AuthService";

export default function NavBar(props) {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const onClickLogout = () => {
    AuthService.logout().then((data) => {
      if (data.session) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unAutenticatedNavBar = () => {
    return (
      <Fragment>
        <NavLink to="/" className="mr-5">
          <Button onClick={onClickLogout}>SIGN IN</Button>
        </NavLink>
      </Fragment>
    );
  };
  const autenticatedNavBar = () => {
    return (
      <Fragment>
        <NavLink
          to="/Quiz"
          className="mr-5"
          activeStyle={{
            fontWeight: "bold",
            backgroundColor: "rgb(66, 106, 250)",
          }}
        >
          <span>Quiz</span>
        </NavLink>
        {user.role === "admin" ? (
          <NavLink
            to="/Admin"
            className="mr-5"
            activeStyle={{
              fontWeight: "bold",
              backgroundColor: "rgb(66, 106, 250)",
            }}
          >
            <span>Admin</span>
          </NavLink>
        ) : null}
        <NavLink to="/SignIn" className="mr-5">
          <Button onClick={onClickLogout}>LOGOUT</Button>
        </NavLink>
        <NavLink to="" className="mr-5">
          <span>Hello {user.username}</span>
        </NavLink>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <Nav className="justify">
          <Navbar.Brand>
            <NavLink to="/About" className="mr-5">
              <span>Quiz Manager</span>
            </NavLink>
          </Navbar.Brand>
          {!isAuthenticated ? unAutenticatedNavBar() : autenticatedNavBar()}
          <NavLink to="/About" className="mr-5">
            <span>About</span>
          </NavLink>
        </Nav>
      </Navbar>
      <br />
    </Fragment>
  );
}

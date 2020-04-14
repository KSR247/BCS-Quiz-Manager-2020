import React, { useState, useContext } from "react";
import { AuthContext } from "../Services/AuthContent";
import AuthService from "../Services/AuthService";
import { Link } from "react-router-dom";
import Message from "./Message";

export default function SignIn(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.signIn(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/quiz");
      } else setMessage(message);
    });
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={onSubmit}>
          <h1>Please Sign in</h1>
          <input
            type="text"
            name="username"
            onChange={onChange}
            placeholder="Enter Username"
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
          />
          <Link to="/NotFound" style={{ color: "black" }}>
            Forgot your password?
          </Link>
          <br />
          <button type="submit">Sign In</button>
        </form>
        {message ? <Message message={message} /> : null}
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back</h1>
            <p>To Start a quiz pleasae login in.</p>

            <p>
              If you wish to test
              <br /> I have created so users you can use to login with,
            </p>
            <p>
              basic user: <span>username: basicUser, password: 123</span>{" "}
            </p>
            <p>
              editor user: <span>username: editor, password: 123</span>{" "}
            </p>
            <p>
              admin user: <span>username: adminUser, password: 123</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

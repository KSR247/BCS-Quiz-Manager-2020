import React, { useState, useRef, useEffect } from "react";
import { AuthContext } from "../Services/AuthContent";
import AuthService from "../Services/AuthService";
import Message from "./Message";

export default function Admin(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  let timer = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  // const getUsers = (event) => {
  //   event.preventDefault();
  //   AuthService.users().then();
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      clearForm();
      if (!message.messageError) {
        timer = setTimeout(() => {
          // getUsers();
        }, 2000);
      }
    });
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={onSubmit}>
          <h1>Register a new user</h1>
          <input
            type="text"
            name="username"
            onChange={onChange}
            placeholder="Enter Username"
          />
          <input
            type="text"
            name="password"
            onChange={onChange}
            placeholder="Password"
          />
          <input
            type="text"
            name="role"
            onChange={onChange}
            placeholder="user/ editor /admin"
          />
          <br />
          <button type="submit">Register a user</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back</h1>
            <p>To Start a quiz pleasae login in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AuthService from "../Services/AuthService";
import Message from "./Message";

export default function Admin(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  // const [users, setUsers] = useState([]);
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

  //TODO: feact all users, so they can be displayed on the right side.

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
    <Container>
      <Row>
        <Col className="w-50 primary-success">
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control as="select" name="role" onChange={onChange}>
                <option value="user">Basic User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Register new user</Button>
              </Col>
            </Form.Group>
            {message ? <Message message={message} /> : null}
          </Form>
        </Col>
        <Col className="w-50">
          <h1>Register a new user</h1>
          <p>To Start a quiz pleasae login.</p>
          <p>
            If you wish to test <br /> I have created test users in the
            database, that you can use to login with,
          </p>
          <p>
            basic Restricted: <span>username: basicUser, password: 123</span>
          </p>
          <p>
            editor Viwer: <span>username: Viwer, password: 123</span>
          </p>
          <p>
            admin editor: <span>username: admin, password: 123</span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

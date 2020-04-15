import React, { useState, useContext } from "react";
import { AuthContext } from "../Services/AuthContent";
import AuthService from "../Services/AuthService";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
              </Col>
            </Form.Group>
            {message ? <Message message={message} /> : null}
          </Form>
        </Col>
        <Col className="w-50">
          <h1>Welcome Back</h1>
          <p>To Start a quiz pleasae login in.</p>
          <p>
            If you wish to test // <br /> I have created so users you can use to
            login with,
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

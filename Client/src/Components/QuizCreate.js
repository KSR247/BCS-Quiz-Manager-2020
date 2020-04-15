import React, { useState, useRef, useEffect, Fragment } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Message from "./Message";
import QuizService from "../Services/QuizService";

export default function QuizCreate(props) {
  const [quiz, setQuiz] = useState({
    questionTitle: "",
    options: [],
    questionType: "",
    correctOption: null,
  });
  const [message, setMessage] = useState(null);
  let timer = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  //TODO: fix the push to array for options, currently only the last options is added, overwrites others.
  const onChange = (event) => {
    event.preventDefault();
    setQuiz({ ...quiz, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setQuiz({
      questionTitle: "",
      options: [],
      questionType: "",
      correctOption: "null",
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    QuizService.addQuiz(quiz).then((data) => {
      console.log(quiz);
      const { message } = data;
      setMessage(message);
      clearForm();
      if (!message.messageError) {
        timer = setTimeout(() => {}, 2000);
      }
    });
  };
  //TODO: form needs validation before submitting.
  return (
    <Fragment>
      <Container>
        <Row>
          <Col className="w-50">
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Title:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="questionTitle"
                    placeholder="Enter a quiz title"
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Option A:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="options"
                    placeholder="answer one"
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Option B:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="options"
                    placeholder="answer two"
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Option C:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="options"
                    placeholder="answer three"
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Option D:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="options"
                    placeholder="answer four"
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Quiz category:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="questionType"
                    placeholder="type of quiz"
                    onChange={onChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group controlId="correctOption">
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control
                  as="select"
                  name="correctOption"
                  onChange={onChange}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button className="mr-5" type="submit">
                    Add Another question
                  </Button>
                  <Button type="submit">Save Quiz</Button>
                </Col>
              </Form.Group>
              {message ? <Message message={message} /> : null}
            </Form>
          </Col>
          <Col className="w-50">
            <h1>Create a new Quiz</h1>
            <br />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

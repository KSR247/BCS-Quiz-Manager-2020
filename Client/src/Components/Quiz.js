import React, { useState, useContext, useEffect, Fragment } from "react";
import { Row, Col, ListGroup, Button, Accordion, Card } from "react-bootstrap";
import QuizService from "../Services/QuizService";

export default function Quiz(props) {
  const [id, setId] = useState("5e93975ba2a74b2950e3eafa");
  const [answer, setAnswer] = useState(false);

  const deleteQuizHandler = (event) => {
    // setId(event.currentTarget.dataset.id);
    QuizService.deleteQuiz(id).then((data) => {
      console.log(id);
    });
  };

  // useEffect(() => {
  //   console.log("id", id);
  // }, [id]);

  const correctAnswer = () => {
    return (
      <div>
        <br />
        <label>The Correct answer is:</label>
        <p>{props.quiz.correctOption}</p>
      </div>
    );
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item action variant="secondary">
              {props.quiz.questionTitle}
            </ListGroup.Item>
            <br />
          </ListGroup>
        </Col>
        {props.user.role === "admin" ? (
          <Fragment>
            <Col className="col-1">
              <Button>Edit</Button>
            </Col>
            <Col className="col-2">
              <Button
                className="btn-danger"
                onBlur={(e) => setId(e.target.value)}
                id={props.quiz._id}
                name={props.quiz._id}
                value={props.quiz._id}
                onClick={deleteQuizHandler}
              >
                Delete
              </Button>
            </Col>
          </Fragment>
        ) : null}
        {props.user.role === "admin" || props.user.role === "editor" ? (
          <Col className="col-2">
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Show Answers
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>{props.quiz.correctOption}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        ) : null}
      </Row>
    </Fragment>
  );
}

import React, { useState, useContext, useEffect, Fragment } from "react";
import Quiz from "./Quiz";
import { Container, Row, Col, Button } from "react-bootstrap";
import QuizService from "../Services/QuizService";
import { AuthContext } from "../Services/AuthContent";
import { Link } from "react-router-dom";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [message, setMessage] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    QuizService.getQuizzes().then((data) => {
      setQuizzes(data);
    });
  }, []);

  return (
    <Fragment>
      <Container>
        <br />
        <Row>
          <Col md={{ offset: 9 }}>
            {user.role === "admin" ? (
              <Link to="/add" className="">
                <Button>Add a quiz</Button>
              </Link>
            ) : null}
          </Col>
        </Row>
        <br />
        <ul>
          <h2>Please select a quiz.</h2>
          {quizzes.map((quiz) => {
            return <Quiz key={quiz._id} quiz={quiz} user={user} />;
          })}
        </ul>
      </Container>
    </Fragment>
  );
}

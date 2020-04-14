import React, { useState, useContext, useEffect, Fragment } from "react";
import QuizService from "../Services/QuizService";

export default function Quiz(props) {
  const [id, setId] = useState("");
  const [answer, setAnswer] = useState(false);

  const deleteQuizHandler = (event) => {
    const { id } = event.target.value;
    QuizService.deleteQuiz(id).then((data) => {
      console.log(id);
    });
  };

  const showAnswer = (event) => {
    event.preventDefault();
    setAnswer(true);
    console.log(answer);
  };

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
    <div className="quizItem">
      <li className="quizList">{props.quiz.questionTitle}</li>
      {props.user.role === "admin" || props.user.role === "editor" ? (
        <Fragment>
          <button className="buttonQuiz" onClick={showAnswer}>
            Show answer
          </button>
          {!answer ? null : correctAnswer()}

          <button className="buttonQuiz">Edit</button>
          <button
            className="buttonQuiz"
            value={props.quiz._id}
            onClick={deleteQuizHandler}
          >
            Delete
          </button>
        </Fragment>
      ) : null}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
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

  const onChange = (event) => {
    event.preventDefault();
    setQuiz({ ...quiz, [event.target.name]: event.target.value });
  };

  const clearForm = () => {
    setQuiz({
      questionTitle: "",
      options: [],
      questionType: "",
      correctOption: null,
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
          <h1>Create a new Quiz</h1>
          <input
            type="text"
            name="questionTitle"
            onChange={onChange}
            placeholder="Enter a quiz title"
          />
          <input
            type="text"
            name="options"
            onChange={onChange}
            placeholder="answer one"
          />
          <input
            type="text"
            name="options"
            onChange={onChange}
            placeholder="answer two"
          />
          <input
            type="text"
            name="options"
            onChange={onChange}
            placeholder="answer three"
          />
          <input
            type="text"
            name="questionType"
            onChange={onChange}
            placeholder="Type of quiz?"
          />
          {/* This needs to be converted into a dropdow list */}
          <input
            type="text"
            name="correctOption"
            onChange={onChange}
            placeholder="Please provide the correct answer as a number"
          />
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left"></div>
        </div>
      </div>
    </div>
  );
}

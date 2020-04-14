import React, { useState, useContext, useEffect } from "react";
import Quiz from "./Quiz";
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
    <div className="quizContainer">
      <ul>
        {user.role === "admin" || user.role === "editor" ? (
          <li className="addQuiz">
            <Link to="/add" className="nav-link">
              <span className="link-text">Add a quiz</span>
            </Link>
          </li>
        ) : null}
        <h2>Please select a quiz.</h2>
        {quizzes.map((quiz) => {
          return <Quiz key={quiz._id} quiz={quiz} user={user} />;
        })}
      </ul>
    </div>
  );
}

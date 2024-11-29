import { Link, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import {
  IoMdArrowDropleft,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { PiArrowFatRightLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import { setQuestions, setQuizzes } from "./reducer";
import * as quizzesClient from "./client";

export default function Preview() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setAllQuestions] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await quizzesClient.findQuestionsForQuiz(
          qid as string
        );
        setAllQuestions(questions);
        dispatch(setQuestions(questions));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      if (quizzes) {
        const currentQuiz = quizzes.find((quiz: any) => quiz._id === qid);
        setQuiz(currentQuiz);
        dispatch(setQuizzes(quizzes));
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  useEffect(() => {
    if (!quiz) {
      fetchQuizzes();
    }
  }, [cid, qid]);

  if (!quiz) {
    return <p>Loading quiz data...</p>;
  }

  if (!questions) {
    return <p>Loading questions...</p>;
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div id="wd-quiz" className="container-fluid">
      <div className="fs-2 fw-bold row mb-3">
        {quiz.title} <br />
      </div>
      {currentUser.role === "FACULTY" && (
        <div
          className="row d-flex align-items-center text-danger mb-3 rounded"
          style={{
            height: "40px",
            backgroundColor: "#f8d7da",
            overflow: "hidden",
          }}
        >
          <div className="d-flex align-items-center">
            <IoMdInformationCircleOutline className="me-2" />
            This is a preview of the published version of the quiz.
          </div>
        </div>
      )}
      <div className="row mb-3">
        Started: {formatDate(new Date(Date.now()))} <br />
      </div>
      <h3 className="row mb-3 fw-bold">Quiz Instructions</h3>
      <hr />
      {questions.length === 0 ? (
        <p>No questions available for this quiz.</p>
      ) : (
        <>
          <div className="position-relative">
            <span className="position-absolute fs-5" style={{ top: "25px" }}>
              <PiArrowFatRightLight />
            </span>

            <div className="row mb-4 border rounded p-3 m-4 d-flex align-items-center justify-content-center">
              <div className="row mb-2 bg-light border rounded p-2">
                <div className="col-6 fs-5 fw-bold">
                  Question {currentQuestionIndex + 1}
                </div>
                <div className="col-6 text-end fs-6">
                  {questions[currentQuestionIndex].points}
                </div>
              </div>
              <div className="row mb-2">
                <span className="mb-2">
                  <h4 className="mb-2">
                    {questions[currentQuestionIndex].title}
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questions[currentQuestionIndex].description,
                    }}
                  />
                </span>
                {questions[currentQuestionIndex].type === "MULTIPLE" && (
                  <div>
                    {questions[currentQuestionIndex].choices.map(
                      (choice: any, index: number) => (
                        <div key={index} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name={`multiple-${currentQuestionIndex}`}
                            id={`choice-${index}`}
                          />
                          <label
                            htmlFor={`choice-${index}`}
                            className="form-check-label"
                          >
                            {choice.answer}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                )}
                {questions[currentQuestionIndex].type === "TRUEFALSE" && (
                  <div>
                    <input
                      type="radio"
                      className="form-check-input me-2"
                      name={`trueFalse-${currentQuestionIndex}`}
                      id={`true-${currentQuestionIndex}`}
                      value="True"
                    />
                    <label
                      htmlFor={`true-${currentQuestionIndex}`}
                      className="form-check-label"
                    >
                      True
                    </label>
                    <br />
                    <input
                      type="radio"
                      className="form-check-input me-2"
                      name={`trueFalse-${currentQuestionIndex}`}
                      value="False"
                      id={`false-${currentQuestionIndex}`}
                    />
                    <label htmlFor={`false-${currentQuestionIndex}`}>
                      False
                    </label>
                  </div>
                )}
                {questions[currentQuestionIndex].type === "FILLIN" && (
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your answer here"
                      name={`fillIn-${currentQuestionIndex}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between mb-3 me-2">
              <button
                className="d-flex align-items-center btn btn-secondary"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <IoMdArrowDropleft className="me-2" />
                Previous
              </button>
              <button
                className="d-flex align-items-center btn btn-secondary"
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                <span className="me-2">Next</span>
                <IoMdArrowDropright />
              </button>
            </div>
          </div>
          <div className="d-flex border justify-content-end mb-3 p-3 rounded">
            <button className="d-flex align-items-center btn btn-secondary">
              <span>Submit Quiz</span>
            </button>
          </div>
        </>
      )}

      {currentUser.role === "FACULTY" && (
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}
          className="text-decoration-none"
        >
          <button className="btn btn-secondary w-100 p-3 border rounded mt-4 d-flex align-items-center">
            <FaPencil className="me-2 " />
            Keep Editing This Quiz
          </button>
        </Link>
      )}
    </div>
  );
}

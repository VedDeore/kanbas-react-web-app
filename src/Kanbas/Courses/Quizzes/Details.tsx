import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";

import { FaPencil } from "react-icons/fa6";
import { setQuizzes } from "./reducer";

export default function Details() {
  const { cid, qid } = useParams();
  // const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  const dispatch = useDispatch();
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center">
        {currentUser.role === "FACULTY" ? (
          <>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`}>
              <button className="btn btn-secondary me-2">Preview</button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
              <button className="btn btn-primary">
                <FaPencil className="fs-6 me-2" />
                Edit
              </button>
            </Link>
          </>
        ) : (
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`}>
            <button className="btn btn-danger">Take Quiz</button>
          </Link>
        )}
      </div>

      <hr />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="fw-bold mb-0">{quiz.title}</h3>
            </div>

            <div className="card-body">
              {currentUser.role === "FACULTY" && (
                <div className="row mb-3">
                  <div className="col-4 text-end fw-bold">Quiz Type</div>
                  <div className="col-8">{quiz.quizType}</div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col-4 text-end fw-bold">Points</div>
                <div className="col-8">{quiz.points}</div>
              </div>
              <div className="row mb-3">
                <div className="col-4 text-end fw-bold">
                  Number of Questions
                </div>
                <div className="col-8">
                  {quiz.numberOfQuestions ? quiz.numberOfQuestions : 0}
                </div>
              </div>
              {currentUser.role === "FACULTY" && (
                <>
                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      Assignment Group
                    </div>
                    <div className="col-8">{quiz.assignmentGroup}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      Shuffle Answers
                    </div>
                    <div className="col-8">
                      {quiz.shuffleAnswers ? "Yes" : "No"}
                    </div>
                  </div>
                </>
              )}
              <div className="row mb-3">
                <div className="col-4 text-end fw-bold">Time Limit</div>
                <div className="col-8">{quiz.timeLimit} Minutes</div>
              </div>
              {currentUser.role === "FACULTY" && (
                <>
                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      Multiple Attempts
                    </div>
                    <div className="col-8">
                      {quiz.multipleAttempts ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      Number of Attempts
                    </div>
                    <div className="col-8">{quiz.multipleAttemptsCount}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      Show Correct Answers
                    </div>
                    <div className="col-8">
                      {quiz.showCorrectAnswers ? "Yes" : "No"}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">Access Code</div>
                    <div className="col-8">
                      {quiz.accessCode ? quiz.accessCode : "N/A"}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      One Question at a Time
                    </div>
                    <div className="col-8">
                      {quiz.oneQuestionAtATime ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      Webcam Required
                    </div>
                    <div className="col-8">
                      {quiz.webcamRequired ? "Yes" : "No"}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-4 text-end fw-bold">
                      Lock Questions After Answering
                    </div>
                    <div className="col-8">
                      {quiz.lockQuestionAfterAnswering ? "Yes" : "No"}
                    </div>
                  </div>
                </>
              )}

              <hr />

              <table className="table">
                <thead>
                  <tr>
                    <th>Due</th>
                    {currentUser.role === "FACULTY" && <th>For</th>}
                    <th>Available from</th>
                    <th>Until</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatDate(quiz.dueDate)}</td>
                    {currentUser.role === "FACULTY" && <td>Everyone</td>}
                    <td>{formatDate(quiz.availableFrom)}</td>
                    <td>{formatDate(quiz.availableUntil)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

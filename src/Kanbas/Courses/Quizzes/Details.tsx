import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as usersClient from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { setQuizzes } from "./reducer";

export default function Details() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [studentGrade, setStudentGrade] = useState<any>(null);
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [totalPossibleScore, setTotalPossibleScore] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [gradeResponse, setGradeResponse] = useState<any>(null);
  const navigate = useNavigate();

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

  const fetchStudentGrade = async () => {
    try {
      const gradeResponse = await usersClient.getGrades(
        currentUser._id,
        qid as String
      );
      setGradeResponse(gradeResponse);
      if (gradeResponse) {
        setStudentGrade(gradeResponse.grade);
        setCurrentAttempt(gradeResponse.attempts);
        setTimeTaken(gradeResponse.time);
      }
    } catch (error) {
      console.error("Error fetching student grade:", error);
    }
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

  const fetchTotalPossibleScore = async () => {
    try {
      const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
      const totalScore = questions.reduce(
        (sum: number, question: any) => sum + question.points,
        0
      );
      setTotalPossibleScore(totalScore);
    } catch (error) {
      console.error("Error fetching total possible score:", error);
    }
  };

  useEffect(() => {
    if (!quiz) {
      fetchQuizzes();
      fetchStudentGrade();
      fetchTotalPossibleScore();
    }
  }, [cid, qid]);

  if (!quiz) {
    return <p>Loading quiz data...</p>;
  }

  const handleAttempts = () => {
    if (currentAttempt < quiz.multipleAttemptsCount) {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`);
    } else {
      alert("You have already attempted the quiz maximum number of times");
    }
  };

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
          <>
            {currentAttempt < quiz.multipleAttemptsCount &&
              new Date().toISOString() >= quiz.availableFrom &&
              new Date().toISOString() <= quiz.availableUntil && (
                <>
                  <button className="btn btn-danger" onClick={handleAttempts}>
                    Take Quiz
                  </button>
                </>
              )}
          </>
        )}
        {studentGrade != null && (
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Responses`}
            state={{
              isPreview: true,
            }}
          >
            <button className="ms-2 btn btn-success">
              {gradeResponse.attempts === quiz.multipleAttemptsCount
                ? "See Correct Responses"
                : "Your Responses"}
            </button>
          </Link>
        )}
      </div>
      <hr />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-3">
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
              <div className="row mb-3">
                <div className="col-4 text-end fw-bold">Multiple Attempts</div>
                <div className="col-8">
                  {quiz.multipleAttempts ? "Yes" : "No"}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4 text-end fw-bold">Number of Attempts</div>
                <div className="col-8">{quiz.multipleAttemptsCount}</div>
              </div>

              {currentUser.role === "FACULTY" ? (
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
              ) : (
                <div className="row mb-3">
                  <div className="col-4 text-end fw-bold">Your Attempts</div>
                  <div className="col-8">{currentAttempt}</div>
                </div>
              )}
              <div className="row mb-3">
                <div className="col-4 text-end fw-bold">Time Limit</div>
                <div className="col-8">{quiz.timeLimit} Minutes</div>
              </div>
              {currentUser.role === "FACULTY" && (
                <>
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
                    <th>Due Date</th>
                    <th>Available from</th>
                    <th>Available Until</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatDate(quiz.dueDate)}</td>
                    <td>{formatDate(quiz.availableFrom)}</td>
                    <td>{formatDate(quiz.availableUntil)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {currentAttempt > 0 && (
            <div className="border rounded mb-4">
              <h5 className="d-flex align-items-center justify-content-center fw-bold mt-3 mb-3">
                Attempt History
              </h5>
              <hr />
              <table className="table table-borderless text-center">
                <thead>
                  <tr>
                    <th>Attempted On</th>
                    <th>Time</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatDate(gradeResponse.dateOfAttempt)}</td>
                    <td>
                      {Math.floor(timeTaken / 60) > 0 &&
                        `${Math.floor(timeTaken / 60)} Minute${
                          Math.floor(timeTaken / 60) !== 1 ? "s" : ""
                        }`}
                      {Math.floor(timeTaken / 60) > 0 &&
                        timeTaken % 60 > 0 &&
                        " "}
                      {timeTaken % 60 > 0 &&
                        `${timeTaken % 60} Second${
                          timeTaken % 60 !== 1 ? "s" : ""
                        }`}
                    </td>
                    <td>
                      {studentGrade}/{totalPossibleScore}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

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
import { useNavigate, useLocation } from "react-router-dom";
import * as coursesClient from "../client";
import { setQuestions, setQuizzes } from "./reducer";
import * as quizzesClient from "./client";
import * as usersClient from "../../Account/client";
import { addResponse, updateResponse } from "./Responses/reducer";

export default function Preview() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setAllQuestions] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState<Number>(0);
  const [responses, setResponses] = useState<string[]>([]);
  let existingResponse: any = null;
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleRadioChange = (value: string) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = value;
    setResponses(updatedResponses);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestionIndex] = e.target.value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    if (!cid || !qid) return;

    let totalGrade = 0;
    const newResponse = {
      user: currentUser._id,
      quiz: qid,
      grade: 0,
      attempts: 1,
      time: 0,
      dateOfAttempt: new Date(),

      questions: responses.map((response, index) => {
        const question = questions[index];
        let questionPoints = 0;

        if (question.type === "MULTIPLE") {
          const correctChoice = question.choices.find(
            (choice: any) => choice.correct === true
          );
          if (response === correctChoice.answer) {
            questionPoints = question.points;
          }
        }

        if (question.type === "TRUEFALSE") {
          const correctChoice = question.choices.find(
            (choice: any) => choice.correct === true
          );
          if (response === correctChoice.answer) {
            questionPoints = question.points;
          }
        }

        if (question.type === "FILLIN") {
          const correctChoice = question.choices.find(
            (choice: any) => choice.correct === true
          );
          if (
            response.trim().toLowerCase() ===
            correctChoice.answer.trim().toLowerCase()
          ) {
            questionPoints = question.points;
          }
        }
        totalGrade += questionPoints;

        return {
          question: question._id,
          answer: response,
          points: questionPoints,
        };
      }),
    };
    newResponse.grade = totalGrade;
    newResponse.time = quiz.timeLimit * 60 - (timeRemaining ?? 0);

    try {
      existingResponse = await usersClient.getGrades(currentUser._id, qid);

      if (existingResponse !== null) {
        let attempts = existingResponse.attempts;
        newResponse.attempts = attempts + 1;
        existingResponse = await quizzesClient.updateResponse(
          currentUser,
          quiz,
          newResponse
        );
        dispatch(updateResponse(existingResponse));
      } else {
        existingResponse = await usersClient.createGrades(
          currentUser._id,
          qid,
          newResponse
        );
        dispatch(addResponse(existingResponse));
      }
      existingResponse.attempts = existingResponse.attempts + 1;
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizDetails`);
    } catch (error) {
      console.error("Error saving or updating response for quiz: ", error);
    }
  };

  useEffect(() => {
    const fetchResponses = async () => {
      if (pathname === `/Kanbas/Courses/${cid}/Quizzes/${qid}/Responses`) {
        try {
          const response = await usersClient.getGrades(
            currentUser._id,
            qid as string
          );
          if (response) {
            setResponses(
              response.questions.map((question: any) => question.answer)
            );
            setAttempts(response.attempts);
          } else {
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizDetails`);
          }
        } catch (error) {
          console.error("Error fetching responses: ", error);
        }
      }
    };
    fetchResponses();
  }, []);

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
        console.error("Error fetching questions: ", error);
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
        setTimeRemaining(currentQuiz?.timeLimit * 60);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      setTimer(interval);

      return () => clearInterval(interval);
    }

    if (
      timeRemaining === 0 &&
      pathname !== `/Kanbas/Courses/${cid}/Quizzes/${qid}/Responses`
    ) {
      handleSubmit();
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
      <div className="d-flex justify-content-between">
        <div className="fs-2 fw-bold row mb-3">
          {quiz.title} <br />
        </div>
        {pathname !== `/Kanbas/Courses/${cid}/Quizzes/${qid}/Responses` && (
          <div className="fw-bold fs-5">
            Time Remaining:{" "}
            <span className="text-danger fw-bold">
              {timeRemaining !== null
                ? formatTime(timeRemaining)
                : "Calculating..."}
            </span>
          </div>
        )}
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
            This is a preview of the quiz.
          </div>
        </div>
      )}
      <hr />
      {questions.length === 0 ? (
        <span className="fw-bold">No questions available for this quiz.</span>
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
                  Points: {questions[currentQuestionIndex].points}
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
                            value={choice.answer}
                            onChange={() => handleRadioChange(choice.answer)}
                            checked={
                              responses[currentQuestionIndex] === choice.answer
                            }
                            disabled={
                              responses !== undefined &&
                              pathname.includes("Responses")
                            }
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
                      onChange={() => handleRadioChange("True")}
                      checked={responses[currentQuestionIndex] === "True"}
                      disabled={
                        responses !== undefined &&
                        pathname.includes("Responses")
                      }
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
                      onChange={() => handleRadioChange("False")}
                      checked={responses[currentQuestionIndex] === "False"}
                      id={`false-${currentQuestionIndex}`}
                      disabled={
                        responses !== undefined &&
                        pathname.includes("Responses")
                      }
                    />
                    <label
                      htmlFor={`false-${currentQuestionIndex}`}
                      className="form-check-label"
                    >
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
                      value={responses[currentQuestionIndex] || ""}
                      onChange={handleTextChange}
                      disabled={
                        responses !== undefined &&
                        pathname.includes("Responses")
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between mb-3 me-2">
              <button
                className={`d-flex align-items-center btn ${
                  currentQuestionIndex === 0 ? "btn-secondary" : "btn-primary"
                }`}
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <IoMdArrowDropleft className="me-2" />
                Previous
              </button>
              <button
                className={`d-flex align-items-center btn ${
                  currentQuestionIndex === questions.length - 1
                    ? "btn-secondary"
                    : "btn-primary"
                }`}
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                <span className="me-2">Next</span>
                <IoMdArrowDropright />
              </button>
            </div>
          </div>

          {pathname.includes("Responses") && (
            <div className="d-flex  flex-column justify-content-center align-items-center mb-3 p-3 border rounded">
              <div>
                {questions[currentQuestionIndex]?.choices.some(
                  (choice: any) =>
                    choice.correct &&
                    choice.answer === responses[currentQuestionIndex]
                ) ? (
                  <div className="fs-5 fw-bold p-3 rounded bg-success-subtle text-success border border-success">
                    Your answer is correct.
                  </div>
                ) : (
                  <div className="fs-5 fw-bold p-3 rounded bg-danger-subtle text-danger border border-danger">
                    Your answer is incorrect.
                  </div>
                )}
              </div>
              {(attempts === quiz.multipleAttemptsCount ||
                currentUser.role === "FACULTY") &&
                quiz.showCorrectAnswers === true && (
                  <div className="mt-3">
                    <div className="fw-bold">
                      Correct answer/s for this question:{" "}
                      <span className="text-success">
                        {questions[currentQuestionIndex]?.choices
                          .filter((choice: any) => choice.correct)
                          .map((choice: any, index: number) => choice.answer)
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          )}
        </>
      )}
      <div className="d-flex border justify-content-end mb-3 p-3 rounded">
        {pathname === `/Kanbas/Courses/${cid}/Quizzes/${qid}/Responses` ? (
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizDetails`}
            className="btn btn-danger ms-2"
          >
            Back to Quiz
          </Link>
        ) : (
          <button
            className="d-flex align-items-center btn btn-danger"
            onClick={handleSubmit}
          >
            <span>Submit Quiz</span>
          </button>
        )}
      </div>

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

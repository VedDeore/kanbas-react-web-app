import { useEffect, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateQuiz } from "./reducer";
import * as quizzesClient from "./client";

export default function QuestionMaker({ question }: { question: any }) {
  const { cid, qid } = useParams();
  const [questionType, setQuestionType] = useState(question.Type);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<
    { text: string; isCorrect: boolean }[]
  >([{ text: "", isCorrect: false }]);

  const addAnswer = () => {
    if (questionType === "TRUEFALSE") {
      setAnswers([
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: false },
      ]);
    } else {
      setAnswers([...answers, { text: "", isCorrect: false }]);
    }
  };

  const updateAnswer = (index: number, value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = value;
    setAnswers(updatedAnswers);
  };

  const toggleCorrectAnswer = (index: number) => {
    const updatedAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index ? !answer.isCorrect : false,
    }));
    setAnswers(updatedAnswers);
  };

  // Fixed removeAnswer function
  const removeAnswer = (indexToRemove: number) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if (questionType === "TRUEFALSE") {
      setAnswers([
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: false },
      ]);
    } else {
      setAnswers([{ text: "", isCorrect: false }]);
    }
  }, [questionType]);

  const dispatch = useDispatch();
  const handleSave = async (e: any) => {
    await quizzesClient.updateQuestion(question);
    dispatch(updateQuiz(question));
  };

  return (
    <div id="wd-questionMaker">
      <form onSubmit={handleSave}>
        <div className="row mb-3">
          <div className="col-sm-4">
            <input
              className="form-control"
              id="wd-question-name"
              placeholder="Question Title"
              value={question.title}
              required
            />
          </div>
          <div className="col-sm-4">
            <select
              id="wd-question-type"
              className="form-select"
              value={question.type}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="MULTIPLE">Multiple Choice Questions</option>
              <option value="TRUEFALSE">True/False Questions</option>
              <option value="FILLIN">Fill in the blanks questions</option>
            </select>
          </div>
          <div className="col-sm-4 d-flex align-items-center">
            <span className="me-2">Points:</span>
            <input
              type="number"
              className="form-control"
              id="wd-points"
              placeholder="Points"
              value={question.points}
              required
            />
          </div>
        </div>
        <hr />
        <div className="d-flex mb-3">
          {question.type === "MULTIPLE" ? (
            <>
              Enter your question and multiple answers, then select one correct
              answer.
            </>
          ) : question.type === "TRUEFALSE" ? (
            <>
              Enter your question text, then select if True or False is the
              correct answer.
            </>
          ) : question.type === "FILLIN" ? (
            <>
              Enter your question text, then define all possible correct answers
              for the blank. Students will see the question followed by a small
              text box to type their answer.
            </>
          ) : null}
        </div>
        <div className="row mb-3">
          <b>Description:</b>
        </div>
        <div className="mb-3">
          <ReactQuill
            value={question.description}
            placeholder="Quiz Description"
            theme="snow"
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <b>Answers:</b>
        </div>
        {question.type === "TRUEFALSE" ? (
          <>
            <div className="d-flex mb-3 align-items-center">
              <span
                className={`col-sm-2 text-end ${
                  question.correct ? "text-success fw-bold" : ""
                }`}
              >
                <span
                  onClick={() => toggleCorrectAnswer(0)}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowAltCircleRight
                    className={`me-3 ${
                      question.correct ? "text-success" : "text-secondary"
                    }`}
                  />
                  {question.correct ? "Correct Answer" : "Possible Answer"}
                </span>
              </span>
              <input
                type="text"
                className="form-control ms-3 me-4"
                value="True"
                readOnly
              />
            </div>
            <div className="d-flex mb-3 align-items-center">
              <span
                className={`col-sm-2 text-end ${
                  !question.correct ? "text-success fw-bold" : ""
                }`}
              >
                <span
                  onClick={() => toggleCorrectAnswer(1)}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowAltCircleRight
                    className={`me-3 ${
                      !question.correct ? "text-success" : "text-secondary"
                    }`}
                  />
                  {!question.correct ? "Correct Answer" : "Possible Answer"}
                </span>
              </span>
              <input
                type="text"
                className="form-control ms-3 me-4"
                value="False"
                readOnly
              />
            </div>
          </>
        ) : question.type === "MULTIPLE" ? (
          question.choices.map((answer: any, index: any) => (
            <div className="d-flex mb-3 align-items-center" key={index}>
              <span
                className={`col-sm-2 text-end ${
                  question.choices[index].correct ? "text-success fw-bold" : ""
                }`}
              >
                <span
                  onClick={() => toggleCorrectAnswer(index)}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowAltCircleRight
                    className={`me-3 ${
                      question.choices[index].correct
                        ? "text-success"
                        : "text-secondary"
                    }`}
                  />
                  {question.choices[index].correct
                    ? "Correct Answer"
                    : "Possible Answer"}
                </span>
              </span>
              <input
                type="text"
                className="form-control ms-3 me-4"
                id="wd-answer"
                placeholder="Answer"
                value={question.choices[index].answer}
                onChange={(e) => updateAnswer(index, e.target.value)}
                required
              />
              <>
                <FaPencil className="text-primary me-3" />
                <FaTrash
                  className="text-danger me-2 mb-1"
                  onClick={() => removeAnswer(index)}
                  style={{ cursor: "pointer" }}
                />
              </>
            </div>
          ))
        ) : question.type === "FILLIN" ? (
          question.correct.map((answer: any, index: any) => (
            <div className="d-flex mb-3 align-items-center" key={index}>
              <input
                type="text"
                className="form-control ms-3 me-4"
                id="wd-answer"
                placeholder="Answer"
                value={question.correct[index]}
                onChange={(e) => updateAnswer(index, e.target.value)}
                required
              />
              <>
                <FaPencil className="text-primary me-3" />
                <FaTrash
                  className="text-danger me-2 mb-1"
                  onClick={() => removeAnswer(index)}
                  style={{ cursor: "pointer" }}
                />
              </>
            </div>
          ))
        ) : null}
        {question.type !== "TRUEFALSE" && (
          <div className="d-flex mb-3 justify-content-end">
            <button
              type="button"
              className="btn text-danger"
              onClick={addAnswer}
            >
              + Add Another Answer
            </button>
          </div>
        )}
        <div className="row mb-3 d-flex">
          <div>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
              <button
                id="wd-edit-quiz-cancel"
                className="btn btn-secondary btn-outline-secondary me-1"
                type="button"
              >
                Cancel
              </button>
            </Link>
            <button
              id="wd-edit-quiz-save"
              className="btn btn-danger me-1"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

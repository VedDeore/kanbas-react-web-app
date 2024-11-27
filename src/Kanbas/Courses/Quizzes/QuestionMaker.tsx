import { useEffect, useState } from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function QuestionMaker() {
  const { cid } = useParams();
  const [questionType, setQuestionType] = useState("MULTIPLE");
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

  return (
    <div id="wd-questionmaker">
      <form action="">
        <div className="row mb-3">
          <div className="col-sm-4">
            <input
              className="form-control"
              id="wd-question-name"
              placeholder="Question Title"
              defaultValue="Easy Question"
              required
            />
          </div>
          <div className="col-sm-4">
            <select
              id="wd-question-type"
              className="form-select"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="MULTIPLE">Multiple Choice Questions</option>
              <option value="TRUEFALSE">True/False Questions</option>
              <option value="FILL">Fill in the blanks questions</option>
            </select>
          </div>
          <div className="col-sm-4 d-flex align-items-center">
            <span className="me-2">Points:</span>
            <input
              type="number"
              className="form-control"
              id="wd-points"
              placeholder="Points"
              defaultValue="4"
              required
            />
          </div>
        </div>
        <hr />
        <div className="d-flex mb-3">
          {/* {questionType === "MULTIPLE" ? (
          <>Enter your question and multiple answers, then select the one correct
          answer.</>): ()} */}
          {questionType === "MULTIPLE" ? (
            <>
              Enter your question and multiple answers, then select the one
              correct answer.
            </>
          ) : questionType === "TRUEFALSE" ? (
            <>
              Enter your question text, then select if True or False is the
              correct answer.
            </>
          ) : questionType === "FILL" ? (
            <>
              Enter your question text, then define all possible correct answers
              for the blank. Students will see the question followed by a small
              text box to type their answer.
            </>
          ) : null}
        </div>
        <div className="row mb-3">
          <b>Question:</b>
        </div>
        <div className="mb-3">
          <ReactQuill
            value=""
            placeholder="Quiz Description"
            theme="snow"
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <b>Answers:</b>
        </div>
        {questionType === "TRUEFALSE" && answers.length >= 2 ? (
          <>
            <div className="d-flex mb-3 align-items-center">
              <span
                className={`col-sm-2 text-end ${
                  answers[0].isCorrect ? "text-success fw-bold" : ""
                }`}
              >
                <span
                  onClick={() => toggleCorrectAnswer(0)}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowAltCircleRight
                    className={`me-3 ${
                      answers[0].isCorrect ? "text-success" : "text-secondary"
                    }`}
                  />
                  {answers[0].isCorrect ? "Correct Answer" : "Possible Answer"}
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
                  answers[1].isCorrect ? "text-success fw-bold" : ""
                }`}
              >
                <span
                  onClick={() => toggleCorrectAnswer(1)}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowAltCircleRight
                    className={`me-3 ${
                      answers[1].isCorrect ? "text-success" : "text-secondary"
                    }`}
                  />
                  {answers[1].isCorrect ? "Correct Answer" : "Possible Answer"}
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
        ) : questionType === "MULTIPLE" ? (
          answers.map((answer, index) => (
            <div className="d-flex mb-3 align-items-center" key={index}>
              <span
                className={`col-sm-2 text-end ${
                  answer.isCorrect ? "text-success fw-bold" : ""
                }`}
              >
                <span
                  onClick={() => toggleCorrectAnswer(index)}
                  style={{ cursor: "pointer" }}
                >
                  <FaArrowAltCircleRight
                    className={`me-3 ${
                      answer.isCorrect ? "text-success" : "text-secondary"
                    }`}
                  />
                  {answer.isCorrect ? "Correct Answer" : "Possible Answer"}
                </span>
              </span>
              <input
                type="text"
                className="form-control ms-3 me-4"
                id="wd-answer"
                placeholder="Answer"
                value={answer.text}
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
        ) : questionType === "FILL" ? (
          answers.map((answer, index) => (
            <div className="d-flex mb-3 align-items-center" key={index}>
              <input
                type="text"
                className="form-control ms-3 me-4"
                id="wd-answer"
                placeholder="Answer"
                value={answer.text}
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
        {questionType !== "TRUEFALSE" && (
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
            <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
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

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useParams } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addQuestion, updateQuestion } from "./reducer";
import * as quizzesClient from "./client";

export default function QuestionMaker({
  question: initialQuestion,
  quiz,
  onPointsChange,
  onQuestionChange,
  onCanceled,
  currentId,
}: {
  question: any;
  quiz: any;
  onPointsChange: any;
  onQuestionChange: any;
  onCanceled: any;
  currentId: any;
}) {
  const { cid, qid } = useParams();
  const [questionType, setQuestionType] = useState(initialQuestion.type);
  const [question, setQuestion] = useState<any>(initialQuestion);
  const [currentQuiz, setCurrentQuiz] = useState<any>(quiz);
  const [oldPoints, setOldPoints] = useState(initialQuestion.points);
  const [editing, setEditing] = useState(false);
  const [cancel, setCancel] = useState(true);

  const [answers, setAnswers] = useState<
    { text: string; isCorrect: boolean }[]
  >([]);

  const addAnswer = () => {
    if (editing) {
      if (questionType === "TRUEFALSE") {
        setAnswers([
          { text: "True", isCorrect: false },
          { text: "False", isCorrect: false },
        ]);
      } else if (questionType === "MULTIPLE") {
        setAnswers([...answers, { text: "", isCorrect: false }]);
      } else {
        setAnswers([...answers, { text: "", isCorrect: true }]);
      }
    }
  };

  const updateAnswer = (index: number, value: string) => {
    if (editing) {
      const updatedAnswers = [...answers];
      updatedAnswers[index].text = value;
      setAnswers(updatedAnswers);
    }
  };

  const toggleCorrectAnswer = (index: number) => {
    if (editing) {
      const updatedAnswers = answers.map((answer: any, i: any) => ({
        ...answer,
        isCorrect: i === index ? !answer.isCorrect : false,
      }));
      setAnswers(updatedAnswers);
    }
  };

  const removeAnswer = (indexToRemove: number) => {
    if (editing) {
      setAnswers((prevAnswers: any) =>
        prevAnswers.filter((_: any, index: any) => index !== indexToRemove)
      );
    }
  };

  useEffect(() => {
    if (initialQuestion.title === "") {
      setEditing(true);
    }
    if (questionType === "TRUEFALSE") {
      setAnswers([
        { text: "True", isCorrect: question.correct === true },
        { text: "False", isCorrect: question.correct === false },
      ]);
    } else {
      setAnswers(
        question.choices?.map((choice: any) => ({
          text: choice.answer,
          isCorrect: choice.correct,
        })) || []
      );
    }
  }, [questionType]);

  const dispatch = useDispatch();
  const handleSave = async (e: any) => {
    let formattedQuestion;
    if (questionType === "FILLIN") {
      formattedQuestion = {
        ...question,
        choices: answers.map((answer: any) => ({
          ...answer,
          answer: answer.text.trim(),
          correct: true,
        })),
      };
    } else {
      formattedQuestion = {
        ...question,
        choices: answers.map((answer: any) => ({
          ...answer,
          answer: answer.text.trim(),
          correct: answer.isCorrect,
        })),
      };
    }
    console.log("First Formatted Question", formattedQuestion);
    if (initialQuestion.currentid == currentId) {
      await quizzesClient.createQuestionForQuiz(
        qid as string,
        formattedQuestion
      );
      dispatch(addQuestion(formattedQuestion));
      const newPoints = currentQuiz.points + parseInt(formattedQuestion.points);
      const questionsNumber = quiz.numberOfQuestions + 1;
      onPointsChange(newPoints);
      onQuestionChange(questionsNumber, newPoints);
      await quizzesClient.updateQuiz({
        ...quiz,
        points: newPoints,
        numberOfQuestions: questionsNumber,
      });
      setCurrentQuiz({
        ...currentQuiz,
        points: newPoints,
        numberOfQuestions: questionsNumber,
      });
      console.log(questionsNumber);
      initialQuestion.currentid = "";
    } else {
      console.log("Formatted Question", formattedQuestion);
      await quizzesClient.updateQuestion(formattedQuestion);
      dispatch(updateQuestion(formattedQuestion));
      console.log("oldPoints", oldPoints);
      const newPoints =
        currentQuiz.points - oldPoints + parseInt(formattedQuestion.points);
      console.log("newPoints", newPoints);
      setOldPoints(parseInt(formattedQuestion.points));
      console.log("Second oldPoints", oldPoints);

      onPointsChange(newPoints);
      await quizzesClient.updateQuiz({
        ...quiz,
        points: newPoints,
      });
      setCurrentQuiz({ ...currentQuiz, points: newPoints });
    }
    setEditing(false);
  };

  const handleCancel = () => {
    if (initialQuestion.title === "") {
      onCanceled();
    }
    setCancel(!cancel);
    setEditing(false);
  };

  useEffect(() => {
    setQuestion(initialQuestion);
    setOldPoints(initialQuestion.points);
    setQuestionType(initialQuestion.type);
    setAnswers(
      initialQuestion.choices?.map((choice: any) => ({
        text: choice.answer,
        isCorrect: choice.correct,
      })) || []
    );
  }, [cancel]);

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
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
              required
              disabled={!editing}
            />
          </div>
          <div className="col-sm-4">
            <select
              id="wd-question-type"
              className="form-select"
              value={question.type}
              onChange={(e) => {
                setQuestionType(e.target.value);
                setQuestion({ ...question, type: e.target.value });
              }}
              disabled={!editing}
              required
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
              onChange={(e) => {
                setQuestion({ ...question, points: e.target.value });
              }}
              required
              disabled={!editing}
            />
          </div>
        </div>
        <hr />
        <div className="d-flex mb-3">
          {questionType === "MULTIPLE" ? (
            <>
              Enter your question and multiple answers, then select one correct
              answer.
            </>
          ) : questionType === "TRUEFALSE" ? (
            <>
              Enter your question text, then select if True or False is the
              correct answer.
            </>
          ) : questionType === "FILLIN" ? (
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
            onChange={(value) =>
              setQuestion({ ...question, description: value })
            }
            placeholder="Quiz Description"
            theme="snow"
            className="form-control"
            readOnly={!editing}
          />
        </div>
        <div className="row mb-3">
          <b>Answers:</b>
        </div>
        {questionType === "MULTIPLE" || questionType === "TRUEFALSE"
          ? answers.map((answer: any, index: any) => (
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
                  disabled={questionType === "TRUEFALSE" || !editing}
                />
                {questionType !== "TRUEFALSE" && editing && (
                  <FaTrash
                    className="text-danger me-2 mb-1"
                    onClick={() => removeAnswer(index)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            ))
          : answers.map((answer: any, index: any) => (
              <div className="d-flex mb-3 align-items-center" key={index}>
                <input
                  type="text"
                  className="form-control ms-3 me-4"
                  id="wd-answer"
                  placeholder="Answer"
                  value={answer.text}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  required
                  disabled={!editing}
                />
                {editing && (
                  <FaTrash
                    className="text-danger me-2 mb-1"
                    onClick={() => removeAnswer(index)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            ))}
        {questionType !== "TRUEFALSE" && editing && (
          <div className="d-flex mb-3 justify-content-end">
            <button
              type="button"
              className="btn text-danger"
              onClick={addAnswer}
              disabled={!editing}
            >
              + Add Another Answer
            </button>
          </div>
        )}
        {editing ? (
          <div className="row mb-3 d-flex">
            <div>
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
                <button
                  id="wd-edit-quiz-cancel"
                  className="btn btn-secondary btn-outline-secondary me-1"
                  type="button"
                  onClick={() => {
                    handleCancel();
                  }}
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
        ) : (
          <div>
            <span>
              <button
                id="wd-edit-quiz"
                className="btn btn-primary me-1"
                type="button"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </span>
          </div>
        )}
      </form>
    </div>
  );
}

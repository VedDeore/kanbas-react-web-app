import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import Navigation from "./Navigation";
import "react-quill/dist/quill.snow.css";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { addQuiz, setQuizzes, updateQuiz } from "./reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(false);

  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    try {
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
      if (quizzes) {
        dispatch(setQuizzes(quizzes));
        const initialQuiz =
          qid !== "NewQuiz"
            ? quizzes.find((quiz: any) => quiz._id === qid)
            : {
                title: "",
                description: "",
                quizType: "Graded Quiz",
                points: 0,
                assignmentGroup: "Quizzes",
                shuffleAnswers: true,
                timeLimit: 20,
                multipleAttempts: false,
                multipleAttemptsCount: 1,
                showCorrectAnswers: true,
                accessCode: "",
                oneQuestionAtATime: true,
                webcamRequired: false,
                lockQuestionAfterAnswering: false,
                dueDate: null,
                availableFrom: null,
                availableUntil: null,
                published: false,
              };
        setQuiz(initialQuiz);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!quizzes.length) {
      fetchQuizzes();
    } else {
      const initialQuiz =
        qid !== "NewQuiz"
          ? quizzes.find((quiz: any) => quiz._id === qid)
          : {
              title: "",
              description: "",
              quizType: "Graded Quiz",
              points: 0,
              assignmentGroup: "Quizzes",
              shuffleAnswers: true,
              timeLimit: 20,
              multipleAttempts: false,
              multipleAttemptsCount: 1,
              showCorrectAnswers: true,
              accessCode: "",
              oneQuestionAtATime: true,
              webcamRequired: false,
              lockQuestionAfterAnswering: false,
              dueDate: null,
              availableFrom: null,
              availableUntil: null,
              published: false,
            };
      setQuiz(initialQuiz);
      setIsLoading(false);
    }
  }, [quizzes, qid, cid]);

  if (isLoading) {
    return <p>Loading quiz data...</p>;
  }

  const handleSave = async (isPublish: boolean) => {
    if (!quiz.multipleAttempts) {
      quiz.multipleAttemptsCount = 1;
    }
    if (isPublish) {
      quiz.published = true;
    }

    if (qid !== "NewQuiz") {
      await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
    } else {
      if (cid) {
        await coursesClient.createQuizForCourse(cid, quiz);
      }
      dispatch(addQuiz({ ...quiz, course: cid }));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const formatDateForInput = (isoDate: any) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 16);
  };

  const formattedDueDate = formatDateForInput(
    quiz.dueDate?.$date || quiz.dueDate
  );
  const formattedAvailableFrom = formatDateForInput(
    quiz.availableFrom?.$date || quiz.availableFrom
  );
  const formattedAvailableUntil = formatDateForInput(
    quiz.availableUntil?.$date || quiz.availableUntil
  );

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-end align-items-center mb-3">
        <div className="d-flex align-items-center">
          <span>Points: {quiz.points}</span>
          <MdDoNotDisturbAlt className="ms-4" />
          <span className="ms-2 text-muted">Not Published</span>
        </div>
        <BsThreeDotsVertical className="ms-2" />
      </div>
      <hr />
      <Navigation />
      <hr />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(false);
        }}
      >
        <label htmlFor="wd-name" className="mb-3">
          <b>Quiz Name</b>
        </label>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              className="form-control"
              id="wd-name"
              placeholder="Quiz Title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              required
              readOnly={currentUser.role !== "FACULTY"}
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description">
            <b>Quiz Description</b>
          </label>
          <ReactQuill
            value={quiz.description}
            theme="snow"
            className="form-control"
            onChange={(value) => setQuiz({ ...quiz, description: value })}
            readOnly={currentUser.role !== "FACULTY"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quizGroup">
            <b>Quiz Type</b>
          </label>
          <select
            id="quizGroup"
            className="form-select"
            value={quiz.quizType}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
            disabled={currentUser.role !== "FACULTY"}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="quizGroup">
            <b>Assignment Group</b>
          </label>
          <select
            id="assignmentGroup"
            className="form-select"
            value={quiz.assignmentGroup}
            onChange={(e) =>
              setQuiz({ ...quiz, assignmentGroup: e.target.value })
            }
            disabled={currentUser.role !== "FACULTY"}
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Projects">Projects</option>
          </select>
        </div>

        <div className="mb-3">
          Options
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="shuffleOptions"
              checked={quiz.shuffleAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
              }
              disabled={currentUser.role !== "FACULTY"}
            />
            <label className="form-check-label" htmlFor="shuffleOptions">
              Shuffle Options
            </label>
          </div>
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="timeLimit"
              checked={isTimeLimitEnabled}
              onChange={(e) => setIsTimeLimitEnabled(e.target.checked)}
              disabled={currentUser.role !== "FACULTY"}
            />
            <label className="form-check-label" htmlFor="timeLimit">
              Time Limit
            </label>
            <input
              id="timeLimitValue"
              className="d-flex col-sm-3 form-control me-2"
              type="number"
              value={quiz.timeLimit}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setQuiz({ ...quiz, timeLimit: newValue });
              }}
              disabled={!isTimeLimitEnabled}
              required
              readOnly={currentUser.role !== "FACULTY"}
            />
            <span>minutes</span>
          </div>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="multipleAttempts"
            checked={quiz.multipleAttempts}
            onChange={(e) =>
              setQuiz({ ...quiz, multipleAttempts: e.target.checked })
            }
            disabled={currentUser.role !== "FACULTY"}
          />
          <label className="form-check-label" htmlFor="multipleAttempts">
            Multiple Attempts
          </label>
          <input
            id="multipleAttemptsValue"
            className="form-control me-2"
            type="number"
            value={quiz.multipleAttemptsCount}
            onChange={(e) =>
              setQuiz({ ...quiz, multipleAttemptsCount: e.target.value })
            }
            disabled={!quiz.multipleAttempts}
            required
            readOnly={currentUser.role !== "FACULTY"}
            min={2}
          />
          <span>attempts</span>
        </div>

        <div className="form-check mt-3 mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="correct-answers"
            checked={quiz.showCorrectAnswers}
            onChange={(e) =>
              setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })
            }
            disabled={currentUser.role !== "FACULTY"}
          />
          <label className="form-check-label" htmlFor="correct-answers">
            Show correct answers
          </label>
        </div>

        <b>
          <label htmlFor="access-code">Access Code</label>
        </b>
        <br />
        <input
          id="access-code"
          className="form-control mb-3"
          value={quiz.accessCode}
          onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
          readOnly={currentUser.role !== "FACULTY"}
        />
        <br></br>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="webcamGroup">
              <b>Webcam Required</b>
            </label>
            <select
              id="webcamGroup"
              className="form-select"
              value={quiz.webcamRequired ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  webcamRequired: e.target.value === "Yes",
                })
              }
              disabled={currentUser.role !== "FACULTY"}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="one-question">
              <b>One question at a time</b>
            </label>
            <select
              id="one-question"
              className="form-select"
              value={quiz.oneQuestionAtATime ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  oneQuestionAtATime: e.target.value === "Yes",
                })
              }
              disabled={currentUser.role !== "FACULTY"}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="lock-questions">
              <b>Lock Questions After Answering</b>
            </label>
            <select
              id="lock-questions"
              className="form-select"
              value={quiz.lockQuestionAfterAnswering ? "Yes" : "No"}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lockQuestionAfterAnswering: e.target.value === "Yes",
                })
              }
              disabled={currentUser.role !== "FACULTY"}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
        <br></br>
        <div className="card mb-3">
          <div className="card-body">
            <label htmlFor="wd-assign-to" className="form-label">
              <b>Assign to</b>
            </label>
            <div className="d-flex align-items-center border border-gray rounded">
              <span className="border border-gray bg-light rounded p-2 m-2">
                Everyone X
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label">
                <b> Due</b>
              </label>
              <input
                type="datetime-local"
                id="wd-due-date"
                className="form-control"
                value={formattedDueDate}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                required
                readOnly={currentUser.role !== "FACULTY"}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="wd-available-from" className="form-label">
                  <b>Available From</b>
                </label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  className="form-control"
                  value={formattedAvailableFrom}
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableFrom: e.target.value })
                  }
                  required
                  readOnly={currentUser.role !== "FACULTY"}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="wd-available-until" className="form-label">
                  <b>Until</b>
                </label>
                <input
                  type="datetime-local"
                  id="Until"
                  className="form-control"
                  value={formattedAvailableUntil}
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableUntil: e.target.value })
                  }
                  required
                  readOnly={currentUser.role !== "FACULTY"}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />
        {currentUser.role === "FACULTY" && (
          <div className="row mb-3 d-flex justify-content-center">
            <div className="d-flex justify-content-center">
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
                  className="me-1 btn btn-success"
                  onClick={() => handleSave(true)}
                >
                  Save and Publish
                </button>
                <button
                  id="wd-edit-quiz-save"
                  className="btn btn-danger me-1"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

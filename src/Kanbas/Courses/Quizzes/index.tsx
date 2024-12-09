import { BsRocketTakeoff } from "react-icons/bs";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { setQuizzes } from "./reducer";
import { useDispatch } from "react-redux";
import * as coursesClient from "../client";
import { useEffect, useState } from "react";
import QuizSearch from "./QuizSearch";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import * as quizzesClient from "./client";
import * as usersClient from "../../Account/client";
import { deleteQuiz } from "./reducer";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function Quiz() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [showModal, setShowModal] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState<any>(null);
  const [studentGrade, setStudentGrade] = useState<any>({ grade: null });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const dispatch = useDispatch();
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    if (currentUser.role === "FACULTY") {
      dispatch(setQuizzes(quizzes));
    } else if (currentUser.role === "STUDENT") {
      const publishedQuizzes = quizzes.filter((quiz: any) => quiz.published);
      dispatch(setQuizzes(publishedQuizzes));
    }
  };

  useEffect(() => {
    fetchQuizzes();
    const fetchGrades = async () => {
      const gradesMap: Record<string, number | null> = {};

      for (const quiz of quizzes) {
        try {
          const gradeResponse = await usersClient.getGrades(
            currentUser._id,
            quiz._id
          );
          gradesMap[quiz._id] = gradeResponse ? gradeResponse.grade : null;
        } catch (error) {
          console.error(`Failed to fetch grade for quiz ${quiz._id}`, error);
          gradesMap[quiz._id] = null;
        }
      }

      setStudentGrade(gradesMap);
    };

    fetchGrades();
  }, []);

  const handleMenuClick = (quizId: string) => {
    setActiveMenu((prev) => (prev === quizId ? null : quizId));
  };

  const handleDelete = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
    setShowModal(false);
    fetchQuizzes();
  };

  const handlePublishToggle = async (isPublished: boolean, quizId: string) => {
    const quiz = quizzes.find((quiz: any) => quiz._id === quizId);
    await quizzesClient.updateQuiz({ ...quiz, published: !isPublished });
    fetchQuizzes();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      // timeZone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };
  return (
    <div className="me-3">
      <QuizSearch />
      <br />
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-quiz list-group-item p-0 mb-5 fs-5">
          <div className="d-flex align-items-center justify-content-between wd-quizzes-title p-3 ps-2 bg-secondary">
            <div>
              <RiArrowDownSFill className="me-2" />
              <b>ASSIGNMENT QUIZZES</b>{" "}
            </div>
          </div>

          <ul className="wd-quiz-list list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li className="wd-quiz-list-item list-group-item p-3 ps-2">
                <div className="d-flex align-items-center">
                  <BsRocketTakeoff className="me-3 text-success" />
                  <span className="me-3">
                    <a
                      className="wd-quiz-link text-dark text-decoration-none fw-bold"
                      href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/QuizDetails`}
                    >
                      {quiz.title}
                    </a>
                    <br />
                    <span className="fs-6">
                      {currentUser.role === "STUDENT" &&
                        (() => {
                          const now = new Date();
                          const availableFrom = new Date(quiz.availableFrom);
                          const availableUntil = new Date(quiz.availableUntil);

                          if (now < availableFrom) {
                            return (
                              <>
                                <b>Not available until </b>
                                {formatDate(quiz.availableFrom)} |
                              </>
                            );
                          } else if (
                            now >= availableFrom &&
                            now <= availableUntil
                          ) {
                            return <b className="text-success">Available | </b>;
                          } else {
                            return <b className="text-danger">Closed | </b>;
                          }
                        })()}
                      <b>Due Date</b> {formatDate(quiz.dueDate)} | {quiz.points}{" "}
                      Pts |{" "}
                      {quiz.numberOfQuestions ? quiz.numberOfQuestions : 0}{" "}
                      Questions{" "}
                      {currentUser.role === "STUDENT" &&
                        studentGrade[quiz._id] !== undefined && (
                          <>| Your Score: {studentGrade[quiz._id]}</>
                        )}
                    </span>
                  </span>
                  {currentUser.role === "FACULTY" && (
                    <span className="d-flex ms-auto position-relative">
                      {quiz.published ? (
                        <span className="me-1 position-relative">
                          <FaCheckCircle
                            style={{ top: "2px" }}
                            className="text-success me-1 position-absolute fs-5"
                            onClick={() =>
                              handlePublishToggle(quiz.published, quiz._id)
                            }
                          />
                          <FaCircle className="text-white me-1 fs-6" />
                        </span>
                      ) : (
                        <MdDoNotDisturbAlt
                          className="d-flex align-items-center"
                          onClick={() =>
                            handlePublishToggle(quiz.published, quiz._id)
                          }
                        />
                      )}
                      <IoEllipsisVertical
                        className="ms-2 fs-4 cursor-pointer"
                        onClick={() => handleMenuClick(quiz._id)}
                      />
                      {activeMenu === quiz._id && (
                        <ul className="dropdown-menu show position-absolute end-0 mt-2">
                          <Link
                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                            className="text-decoration-none"
                          >
                            <button className="dropdown-item">
                              <FaPencil className="me-3" />
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => setShowModal(true)}
                            className="dropdown-item"
                          >
                            <FaTrash className="me-3" />
                            Delete
                          </button>
                          <div
                            className={`modal ${showModal ? "show" : ""}`}
                            style={{ display: showModal ? "block" : "none" }}
                            tabIndex={-1}
                            role="dialog"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="staticBackdropLabel"
                                  >
                                    Delete Quiz
                                  </h1>
                                </div>
                                <div className="modal-body">
                                  <p>
                                    Are you sure you want to remove this quiz?
                                  </p>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowModal(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleDelete(quiz._id)}
                                    type="button"
                                    data-bs-dismiss="modal"
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {showModal && (
                            <div className="modal-backdrop fade show" />
                          )}

                          <button
                            onClick={() =>
                              handlePublishToggle(quiz.published, quiz._id)
                            }
                            className="dropdown-item"
                          >
                            {quiz.published ? (
                              <MdDoNotDisturbAlt
                                className="me-3"
                                onClick={() =>
                                  handlePublishToggle(quiz.published, quiz._id)
                                }
                              />
                            ) : (
                              <span className="me-1 position-relative">
                                <FaCheckCircle
                                  style={{ top: "2px" }}
                                  className="text-success me-1 position-absolute fs-5"
                                  onClick={() =>
                                    handlePublishToggle(
                                      quiz.published,
                                      quiz._id
                                    )
                                  }
                                />
                                <FaCircle className="text-white me-1 fs-6 me-3" />
                              </span>
                            )}
                            {quiz.published ? "Unpublish" : "Publish"}
                          </button>
                        </ul>
                      )}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

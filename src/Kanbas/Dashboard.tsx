import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as courseClient from "./Courses/client";
import * as accountClient from "./Account/client";
import { enrollCourse, unenrollCourse } from "./Courses/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [localCourses, setLocalCourses] = useState<any[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const dispatch = useDispatch();
  const handleEnroll = async (courseId: string) => {
    try {
      await courseClient.enrollCourse(currentUser._id, courseId);
      const updatedCourses = await accountClient.findMyCourses();
      setEnrolledCourses(updatedCourses);
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await courseClient.unenrollCourse(currentUser._id, courseId);
      const updatedCourses = await accountClient.findMyCourses();
      setLocalCourses(updatedCourses);
      setEnrolledCourses(updatedCourses);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
      if (showAllCourses) {
        setShowAllCourses((prev) => !prev);
      }
    } catch (error) {
      console.error("Unenrollment failed:", error);
    }
  };

  const toggleCourseList = async () => {
    setShowAllCourses((prev) => !prev);
    if (!showAllCourses) {
      const allCourses = await courseClient.fetchAllCourses();
      setLocalCourses(allCourses);
    } else {
      setLocalCourses(enrolledCourses);
    }
  };

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const courses = await accountClient.findMyCourses();
      setEnrolledCourses(courses);
      setLocalCourses(courses);
    };

    fetchEnrolledCourses();
  }, [courses]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <span>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            placeholder="Course Name"
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            placeholder="Course Description"
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </span>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses
            ? "Published Courses (" + localCourses.length + ")"
            : "Enrolled Courses (" + localCourses.length + ")"}
        </h2>
        {currentUser.role === "STUDENT" && (
          <button className="btn btn-primary" onClick={toggleCourseList}>
            {showAllCourses ? "Show Enrolled Courses" : "Show All Course"}
          </button>
        )}
      </div>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5">
          {localCourses.map((course) => (
            <div
              key={course._id}
              className="wd-dashboard-course col mb-3 mt-3"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <ProtectedRoute>
                  <Link
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={`/Kanbas/Courses/${course._id}/Home`}
                  >
                    <img
                      style={{ objectFit: "contain" }}
                      src={`/images/${course.img}`}
                      width="100%"
                      height={160}
                    />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>

                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <button className="btn btn-primary"> Go </button>
                        {currentUser.role === "STUDENT" &&
                          (enrolledCourses.some((c) => c._id === course._id) ? (
                            <button
                              className="btn btn-danger me-2"
                              onClick={(event) => {
                                event.preventDefault();
                                handleUnenroll(course._id);
                              }}
                            >
                              Unenroll
                            </button>
                          ) : (
                            <button
                              className="btn btn-success me-2"
                              onClick={(event) => {
                                event.preventDefault();
                                handleEnroll(course._id);
                              }}
                            >
                              Enroll
                            </button>
                          ))}

                        {currentUser.role === "FACULTY" && (
                          <span>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                              }}
                              className="btn btn-danger float-end"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                            <button
                              id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning me-2 float-end"
                            >
                              Edit
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </ProtectedRoute>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

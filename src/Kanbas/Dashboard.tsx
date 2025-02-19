import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
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
          {enrolling
            ? "Published Courses (" + courses.length + ")"
            : "Enrolled Courses (" + courses.length + ")"}
        </h2>
        {currentUser.role !== "ADMIN" && (
          <button
            onClick={() => setEnrolling(!enrolling)}
            className="float-end btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </div>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5">
          {courses.map((course) => (
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
                        {enrolling && (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                            className={`btn ${
                              course.enrolled ? "btn-danger" : "btn-success"
                            } float-end`}
                          >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                        {!enrolling &&
                          (currentUser.role === "ADMIN" ||
                            currentUser.role === "FACULTY") && (
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

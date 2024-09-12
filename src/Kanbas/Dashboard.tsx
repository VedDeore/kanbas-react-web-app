import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <br />
        <div className="wd-dashboard-course">
          {" "}
          <img src="/images/nodejs.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS2222 Node JS
            </Link>
            <p className="wd-dashboard-course-title">Node JS Course</p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>{" "}
        </div>{" "}
        <br />
        <div className="wd-dashboard-course">
          {" "}
          <img src="/images/html.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS3333 HTML
            </Link>
            <p className="wd-dashboard-course-title">HTML Course</p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>{" "}
        </div>{" "}
        <br />
        <div className="wd-dashboard-course">
          {" "}
          <img src="/images/mongodb.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS4444 MongoDB
            </Link>
            <p className="wd-dashboard-course-title">MongoDB Course</p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>{" "}
        </div>{" "}
        <br />
        <div className="wd-dashboard-course">
          {" "}
          <img src="/images/jquery.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS5555 JQuery
            </Link>
            <p className="wd-dashboard-course-title">JQuery Course</p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>{" "}
        </div>{" "}
        <br />
        <div className="wd-dashboard-course">
          {" "}
          <img src="/images/javascript.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS6666 JS
            </Link>
            <p className="wd-dashboard-course-title">Javascript Course</p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>{" "}
        </div>{" "}
        <br />
        <div className="wd-dashboard-course">
          {" "}
          <img src="/images/redux.jpg" width={200} />
          <div>
            <Link
              className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home"
            >
              CS7777 Redux
            </Link>
            <p className="wd-dashboard-course-title">Redux Course</p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

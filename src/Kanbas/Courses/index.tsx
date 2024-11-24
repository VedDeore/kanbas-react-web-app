import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import ProtectedRoute from "../Account/ProtectedRoute";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as accountClient from "../Account/client";
import * as courseClient from "./client";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (cid) {
        const users = await courseClient.findUsersForCourse(cid);
        setUsers(users);
      }
    };

    fetchUsers();
  }, []);

  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const course = enrolledCourses.find((course) => course._id === cid);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const courses = await accountClient.findMyCourses();
      setEnrolledCourses(courses);
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}{" "}
        {pathname.split("/")[5] && currentUser.role === "FACULTY" && (
          <>&gt; {pathname.split("/")[5]}</>
        )}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<h2>Quizzes</h2>} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="People" element={<PeopleTable users={users} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

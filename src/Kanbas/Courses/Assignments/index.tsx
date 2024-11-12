import { BsGripVertical } from "react-icons/bs";
import AssignmentSearch from "./AssignmentSearch";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdOutlineAssignment } from "react-icons/md";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { setAssignments } from "./reducer";
import { useDispatch } from "react-redux";
import DeleteDialog from "./DeleteDialog";
import * as coursesClient from "../client";
import { useEffect } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };
  return (
    <div className="me-3">
      <AssignmentSearch />
      <br />
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5">
          <div className="d-flex align-items-center justify-content-between wd-assignments-title p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <RiArrowDownSFill className="me-2" />
              <b>ASSIGNMENTS</b>{" "}
            </div>
            {currentUser.role === "FACULTY" && <AssignmentControlButtons />}
          </div>
          <ul className="wd-assignment-list list-group rounded-0">
            {assignments.map((assignment: any) => (
              <li className="wd-assignment-list-item list-group-item p-3 ps-2">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-3 text-success" />
                  <span>
                    <a
                      className="wd-assignment-link text-dark text-decoration-none fw-bold"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </a>
                    <br />
                    <span className="text-danger">Multiple Modules</span> |
                    <b> Not available until</b>{" "}
                    {formatDate(assignment.availableFrom)} | <b>Due</b>{" "}
                    {formatDate(assignment.dueDate)} | {assignment.points} pts
                  </span>

                  <span className="ms-auto">
                    {currentUser.role === "FACULTY" && (
                      <DeleteDialog assignmentId={assignment._id} />
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

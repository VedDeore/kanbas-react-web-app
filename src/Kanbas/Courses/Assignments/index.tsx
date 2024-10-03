import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import AssignmentSearch from "./AssignmentSearch";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { RiArrowDownSFill } from "react-icons/ri";
import { MdOutlineAssignment } from "react-icons/md";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
  return (
    <div className="me-5">
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
            <AssignmentControlButtons />
          </div>
          <ul className="wd-assignment-list list-group rounded-0">
            <li className="wd-assignment-list-item list-group-item p-3 ps-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="me-3" />
                <span>
                  <a
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    A1
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> |
                  <b> Not available until</b> May 6 at 12:00 am | <b>Due</b> May
                  13 at 11:59 pm | 100 pts
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="me-3" />
                <span>
                  <a
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    A2
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> |
                  <b> Not available until</b> May 13 at 12:00 am | <b>Due</b>{" "}
                  May 20 at 11:59 pm | 100 pts
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="me-3" />
                <span>
                  <a
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    A3
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> |
                  <b> Not available until</b> May 20 at 12:00 am | <b>Due</b>{" "}
                  May 27 at 11:59 pm | 100 pts
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="me-3" />
                <span>
                  <a
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    A4
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> |
                  <b> Not available until</b> Sept 17 at 12:00 am | <b>Due</b>{" "}
                  Oct 31 at 11:59 pm | 100 pts
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="me-3" />
                <span>
                  <a
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    A5
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> |
                  <b> Not available until</b> Oct 13 at 12:00 am | <b>Due</b>{" "}
                  Nov 14 at 11:59 pm | 100 pts
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-assignment-list-item list-group-item p-3 ps-2">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="me-3" />
                <span>
                  <a
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                    href="#/Kanbas/Courses/1234/Assignments/123"
                  >
                    A6
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules</span> |
                  <b> Not available until</b> Nov 6 at 12:00 am | <b>Due</b> Nov
                  28 at 11:59 pm | 100 pts
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

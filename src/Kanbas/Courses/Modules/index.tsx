import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  return (
    <div className="me-3">
      <ModulesControls />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="d-flex align-items-center justify-content-between wd-title p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 1{" "}
            </div>
            <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Introduction to the course
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Learn what is Web Development
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Creating a development environment
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Reading
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Full Stack Developer - Chapter 1 - Introduction
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Full Stack Developer - Chapter 2 - Creating User Interfaces With
                HTML
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Slides
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">
                  Introduction to Web Development
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">
                  Creating an HTTP server with Node.js
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">
                  Creating a React Application
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 2<ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Learn how to create user interfaces with HTML
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Keep working on assignment 1
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Deploy the assignment to Netlify
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Reading
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Full Stack Developer - Chapter 1 - Introduction
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Full Stack Developer - Chapter 2 - Creating User Interfaces With
                HTML
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Slides
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">
                  Embedding content with Iframes
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">
                  Drawing with Scalable Vector Graphics
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 3<ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Introduction to CSS
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Selectors by tag ID, classes, and document structure
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Styling color and background color
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Reading
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Full Stack Developer - Chapter 3 - Styling User Interfaces With
                Cascading Style Sheets
                <span className="d-flex justify-content-between">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Slides
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">
                  Introduction to Cascading Style Sheets
                </span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">Styling with Colors</span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">The Box Model</span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 4<ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                CSS Libraries: Bootstrap, Tailwind
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Float and grid systems
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Media queries and responsive design
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Reading
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Full Stack Developer - Chapter 4 - Styling Web Pages With The
                Bootstrap CSS Library
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Slides
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">Introduction to Bootstrap</span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">Grid System</span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">Bootstrap Navigation</span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 5<ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                JavaScript Modules, Exports and Imports
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Iterating over arrays. DEMO: in Loop.js render color arrays with
                matching bg color
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Deconstructors. DEMO: in Deconstructor.js demo object and array
                deconstructor
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Reading
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-5 fs-3" />
                Full Stack Developer - Chapter 5 - Creating Single Page
                Applications With React.Js
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                Slides
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">Introduction to JavaScript</span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">ES6 Variables and Functions</span>
                <span className="ms-auto">
                  <LessonControlButtons />
                </span>
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <IoIosLink className="me-2 fs-3 text-success" />
                <span className="text-danger">ES6 Arrays and Strings</span>
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

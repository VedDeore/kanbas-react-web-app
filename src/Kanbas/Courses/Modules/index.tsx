import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;
  return (
    <div className="me-3">
      <ModulesControls />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="d-flex align-items-center justify-content-between wd-title p-3 ps-2 bg-secondary">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {module.name}
                </div>
                <ModuleControlButtons />
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.link && (
                          <IoIosLink className="me-2 fs-3 text-success" />
                        )}
                        <span
                          className={`${
                            lesson.link ? "text-danger" : "text-black"
                          } ${lesson.submodule ? "ms-4" : ""}`}
                        >
                          {lesson.name}
                        </span>
                        <span className="ms-auto">
                          <LessonControlButtons />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

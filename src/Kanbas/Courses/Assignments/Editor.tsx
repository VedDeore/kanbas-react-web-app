import "../../styles.css";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const initialAssignment =
    aid !== "NewAssignment"
      ? assignments.find((assignment: any) => assignment._id === aid)
      : {
          title: "",
          description: "",
          points: "",
          assignmentGroup: "ASSIGNMENTS",
          gradeAs: "PERCENTAGE",
          submissionType: "ONLINE",
          onlineEntryOptions: [
            { id: "wd-text-entry", label: "Text Entry" },
            { id: "wd-website-url", label: "Website URL" },
            { id: "wd-media-recordings", label: "Media Recordings" },
            { id: "wd-student-annotation", label: "Student Annotation" },
            { id: "wd-file-upload", label: "File Uploads" },
          ],
          dueDate: "",
          availableFrom: "",
          availableUntil: "",
        };

  const [assignment, setAssignment] = useState(initialAssignment);
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (aid !== "NewAssignment") {
      await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    } else {
      if (cid) {
        await coursesClient.createAssignmentForCourse(cid, assignment);
      }
      dispatch(addAssignment({ ...assignment, course: cid }));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="me-3">
      <form onSubmit={handleSave}>
        <label htmlFor="wd-name" className="mb-3">
          <b>Assignment Name</b>
        </label>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              className="form-control"
              id="wd-name"
              placeholder="Assignment Title"
              value={assignment.title}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
              required
              readOnly={currentUser.role !== "FACULTY"}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-sm-12">
            <textarea
              value={assignment.description}
              placeholder="Assignment Description"
              onChange={(e) =>
                setAssignment({ ...assignment, description: e.target.value })
              }
              className="form-control"
              id="wd-description"
              rows={10}
              required
              readOnly={currentUser.role !== "FACULTY"}
            ></textarea>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-points" className="col-sm-2 col-form-label">
            <span className="float-end">Points</span>
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="wd-points"
              value={assignment.points}
              placeholder="Points"
              onChange={(e) =>
                setAssignment({ ...assignment, points: Number(e.target.value) })
              }
              min="1"
              required
              readOnly={currentUser.role !== "FACULTY"}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="wd-group" className="col-sm-2 col-form-label">
            <span className="float-end">Assignment Group</span>
          </label>
          <div className="col-sm-10">
            <select
              id="wd-group"
              className="form-select"
              disabled={currentUser.role !== "FACULTY"}
            >
              <option value="ASSIGNMENTS">{assignment.assignmentGroup}</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="wd-display-grade-as"
            className="col-sm-2 col-form-label"
          >
            <span className="float-end">Display Grade as</span>
          </label>
          <div className="col-sm-10">
            <select
              id="wd-display-grade-as"
              className="form-select"
              disabled={currentUser.role !== "FACULTY"}
            >
              <option value="PERCENTAGE">{assignment.gradeAs}</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label
            htmlFor="wd-submission-type"
            className="col-sm-2 col-form-label"
          >
            <span className="float-end">Submission Type</span>
          </label>
          <div className="col-sm-10">
            <div className="border border-gray rounded">
              <div className="ms-3 me-3">
                <div className="pt-3 pb-3">
                  <select
                    id="wd-submission-type"
                    className="form-select"
                    disabled={currentUser.role !== "FACULTY"}
                  >
                    <option value="Online">{assignment.submissionType}</option>
                  </select>
                </div>
                <b>Online Entry Options</b>
                <div className="pt-2">
                  {assignment.onlineEntryOptions.map(
                    (option: { id: string; label: string }) => (
                      <div className="form-check pb-3" key={option.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={option.id}
                          disabled={currentUser.role !== "FACULTY"}
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label">
            <span className="float-end">Assign</span>
          </label>
          <div className="col-sm-10">
            <div className="border border-gray rounded">
              <div className="ms-3 me-3 mt-3 mb-3">
                <label htmlFor="wd-assign-to" className="form-label">
                  <b>Assign to</b>
                </label>
                <div className="d-flex align-items-center border border-gray rounded">
                  <span className="border border-gray bg-light rounded p-2 m-2">
                    Everyone X
                  </span>
                </div>
                <label htmlFor="wd-due-date" className="form-label">
                  <b>Due</b>
                </label>
                <div className="input-group mb-3">
                  <input
                    type="datetime-local"
                    id="wd-due-date"
                    className="form-control"
                    value={`${assignment.dueDate}`}
                    onChange={(e) =>
                      setAssignment({ ...assignment, dueDate: e.target.value })
                    }
                    required
                    readOnly={currentUser.role !== "FACULTY"}
                  />
                </div>

                <div className="row mb-3 d-flex">
                  <div className="col-sm-6">
                    <label htmlFor="wd-available-from" className="form-label">
                      <b>Available from</b>
                    </label>
                    <div className="input-group mb-3">
                      <input
                        id="wd-available-from"
                        type="datetime-local"
                        className="form-control"
                        value={`${assignment.availableFrom}`}
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            availableFrom: e.target.value,
                          })
                        }
                        required
                        readOnly={currentUser.role !== "FACULTY"}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="wd-available-until" className="form-label">
                      <b>Until</b>
                    </label>
                    <div className="input-group mb-3">
                      <input
                        id="wd-available-until"
                        type="datetime-local"
                        className="form-control"
                        value={`${assignment.availableUntil}`}
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            availableUntil: e.target.value,
                          })
                        }
                        required
                        readOnly={currentUser.role !== "FACULTY"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {currentUser.role === "FACULTY" && (
          <div className="row mb-3 d-flex justify-content-between float-end">
            <div>
              <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                <button
                  id="wd-edit-assignment-cancel"
                  className="btn btn-secondary btn-outline-secondary me-1"
                  type="button"
                >
                  Cancel
                </button>
              </Link>
              <button
                id="wd-edit-assignment-save"
                className="btn btn-danger me-1"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

import "../../styles.css";
import { MdCalendarMonth } from "react-icons/md";
import { assignments } from "../../Database";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  return (
    <div id="wd-assignments-editor" className="me-3">
      <b>
        <label htmlFor="wd-name" className="mb-3">
          Assignment Name
        </label>
      </b>
      {assignments
        .filter((assignment: any) => assignment._id === aid)
        .map((assignment: any) => (
          <form>
            <div className="row mb-3">
              <div className="col-sm-12">
                <input
                  className="form-control"
                  id="wd-name"
                  value={`${assignment.title}`}
                />
              </div>
            </div>

            <div className="mb-3 row">
              <div className="col-sm-12">
                <textarea
                  className="form-control"
                  id="wd-description"
                  rows={10}
                >
                  {assignment.description}
                </textarea>
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="wd-points" className="col-sm-2 col-form-label">
                <span className="float-end">Points</span>
              </label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  id="wd-points"
                  value={assignment.points}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="wd-group" className="col-sm-2 col-form-label">
                <span className="float-end">Assignment Group</span>
              </label>
              <div className="col-sm-10">
                <select id="wd-group" className="form-select">
                  <option value="ASSIGNMENTS">
                    {assignment.assignmentGroup}
                  </option>
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
                <select id="wd-display-grade-as" className="form-select">
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
                      <select id="wd-submission-type" className="form-select">
                        <option value="Online">Online</option>
                      </select>
                    </div>
                    <b>Online Entry Options</b>
                    <div className="form-check">
                      <div className="pt-3 pb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="wd-text-entry"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="wd-text-entry"
                        >
                          Text Entry
                        </label>
                      </div>
                      <div className="pb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="wd-website-url"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="wd-website-url"
                        >
                          Website URL
                        </label>
                      </div>
                      <div className="pb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="wd-media-recordings"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="wd-media-recordings"
                        >
                          Media Recordings
                        </label>
                      </div>
                      <div className="pb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="wd-student-annotation"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="wd-student-annotation"
                        >
                          Student Annotation
                        </label>
                      </div>
                      <div className="pb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="wd-file-upload"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="wd-file-upload"
                        >
                          File Uploads
                        </label>
                      </div>
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
                        id="wd-due-date"
                        type="text"
                        className="form-control"
                        value={`${assignment.dueDate}`}
                      />
                      <span className="input-group-text">
                        <MdCalendarMonth />
                      </span>
                    </div>

                    <div className="row mb-3 d-flex">
                      <div className="col-sm-6">
                        <label
                          htmlFor="wd-available-from"
                          className="form-label"
                        >
                          <b>Available from</b>
                        </label>
                        <div className="input-group mb-3">
                          <input
                            id="wd-available-from"
                            type="text"
                            className="form-control"
                            value={`${assignment.availableFrom}`}
                          />
                          <span className="input-group-text">
                            <MdCalendarMonth />
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <label
                          htmlFor="wd-available-until"
                          className="form-label"
                        >
                          <b>Until</b>
                        </label>
                        <div className="input-group mb-3">
                          <input
                            id="wd-available-until"
                            type="text"
                            className="form-control"
                            value={`${assignment.availableUntil}`}
                          />
                          <span className="input-group-text">
                            <MdCalendarMonth />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="row mb-3 d-flex justify-content-between float-end">
              <div>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                  <button
                    id="wd-edit-assignment-cancel"
                    className="btn btn-secondary btn-outline-secondary me-1"
                  >
                    Cancel
                  </button>
                  <button
                    id="wd-edit-assignment-save"
                    className="btn btn-danger me-1"
                  >
                    Save
                  </button>
                </Link>
              </div>
            </div>
          </form>
        ))}
    </div>
  );
}

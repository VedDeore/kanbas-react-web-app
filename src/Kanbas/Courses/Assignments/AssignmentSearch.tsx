import { BsPlusLg } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

export default function AssignmentSearch() {
  return (
    <div className="d-flex justify-content-between">
      <div
        className="input-group border border-1 rounded"
        style={{ maxWidth: "300px" }}
      >
        <span className="input-group-text bg-white border-0">
          <CiSearch />
        </span>
        <input
          id="wd-search-assignment"
          className="form-control border-0"
          placeholder="Search..."
          style={{ backgroundColor: "white" }}
        />
      </div>
      <div className="float-end">
        <button
          id="wd-add-assignment"
          className="btn btn-secondary btn-outline-secondary me-1"
        >
          <BsPlusLg
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </button>
        <button id="wd-add-assignment-group" className="btn btn-danger me-1">
          <BsPlusLg
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </button>
      </div>
    </div>
  );
}
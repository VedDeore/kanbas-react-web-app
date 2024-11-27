import { BsPlusLg } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function QuizSearch() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
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
          id="wd-search-quiz"
          className="form-control border-0"
          placeholder="Search..."
          style={{ backgroundColor: "white" }}
        />
      </div>
      {currentUser.role === "FACULTY" && (
        <div className="float-end">
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/NewQuiz`}>
            <button id="wd-add-quiz-group" className="btn btn-danger me-1">
              <BsPlusLg
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Quiz
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Navigation() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("details");
  const { cid, qid } = useParams();
  // Function to switch tabs
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="d-flex mb-3">
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/details`}></Link>
      <button
        onClick={() => handleTabClick("details")}
        className={`border-0 py-2 ${
          activeTab === "details"
            ? "bg-secondary text-black font-weight-bold rounded"
            : "text-danger bg-transparent"
        }`}
      >
        Details
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`}>
        <button
          onClick={() => handleTabClick("questions")}
          className={`border-0 px-4 py-2 ${
            activeTab === "questions"
              ? "bg-secondary text-black font-weight-bold"
              : "text-danger bg-transparent"
          }`}
        >
          Questions
        </button>
      </Link>
    </div>
  );
}

import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Navigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const { cid, qid } = useParams();

  return (
    <div className="d-flex mb-3">
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/details`}></Link>
      <button
        onClick={() => setActiveTab("details")}
        className={`border-0 py-2 ${
          activeTab === "details"
            ? "bg-secondary text-black font-weight-bold rounded"
            : "text-danger bg-transparent"
        }`}
      >
        Details
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
        <button
          onClick={() => setActiveTab("questions")}
          className={`border-0 px-4 py-2 ${
            activeTab === "questions"
              ? "bg-secondary text-black font-weight-bold rounded"
              : "text-danger bg-transparent"
          }`}
        >
          Questions
        </button>
      </Link>
    </div>
  );
}

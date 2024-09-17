export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input id="wd-search-assignment" placeholder="Search for Assignments" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A1 - ENV + HTML
          </a>
          <br />
          Multiple Modules | <b>Not available until</b> May 6 at 12:00 am |{" "}
          <b>Due</b> May 13 at 11:59 pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A2 - CSS + BOOTSTRAP
          </a>
          <br />
          Multiple Modules | <b>Not available until</b> May 13 at 12:00 am |{" "}
          <b>Due</b> May 20 at 11:59 pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A3 - JAVASCRIPT + REACT
          </a>
          <br />
          Multiple Modules | <b>Not available until</b> May 20 at 12:00 am |{" "}
          <b>Due</b> May 27 at 11:59 pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A4 - REDUX
          </a>
          <br />
          Multiple Modules | <b>Not available until</b> Sept 17 at 12:00 am |{" "}
          <b>Due</b> Oct 31 at 11:59 pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A5 - API
          </a>
          <br />
          Multiple Modules | <b>Not available until</b> Oct 13 at 12:00 am |{" "}
          <b>Due</b> Nov 14 at 11:59 pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a
            className="wd-assignment-link"
            href="#/Kanbas/Courses/1234/Assignments/123"
          >
            A6 - MONGODB
          </a>
          <br />
          Multiple Modules | <b>Not available until</b> Nov 6 at 12:00 am |{" "}
          <b>Due</b> Nov 28 at 11:59 pm | 100 pts
        </li>
      </ul>
    </div>
  );
}

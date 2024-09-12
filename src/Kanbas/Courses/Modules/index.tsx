export default function Modules() {
  return (
    <div>
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="">
        <option value="PUBLISH ALL">Publish All</option>
      </select>
      <button>+ Modules</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Reading</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Introduction
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 2 - Creating User Interfaces
                  With HTML
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Slides</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development
                </li>
                <li className="wd-content-item">
                  Creating an HTTP server with Node.js
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">A1 Lab</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to HTML and the DOM
                </li>
                <li className="wd-content-item">
                  Formatting Web content with Headings and Paragraphs
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to create user interfaces with HTML
                </li>
                <li className="wd-content-item">
                  Keep working on assignment 1
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Reading</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1 - Introduction
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 2 - Creating User Interfaces
                  With HTML
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">Slides</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Embedding content with Iframes
                </li>
                <li className="wd-content-item">
                  Drawing with Scalable Vector Graphics
                </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">A1 Kanbas</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Implementing the Kanbas Account Screens
                </li>
                <li className="wd-content-item">
                  Implementing the Kanbas Dashboard Screen
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

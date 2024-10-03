import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        id="wd-course-home-link"
        to="/Kanbas/Account/Signin"
        className="list-group-item active border border-0"
      >
        Signin
      </Link>
      <br />
      <Link
        id="wd-course-modules-link"
        to="/Kanbas/Account/Signup"
        className="list-group-item text-danger border border-0"
      >
        Signup
      </Link>
      <br />
      <Link
        id="wd-course-piazza-link"
        to="/Kanbas/Account/Profile"
        className="list-group-item text-danger border border-0"
      >
        Profile
      </Link>
    </div>
  );
}

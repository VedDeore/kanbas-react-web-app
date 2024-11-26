import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.includes("Profile") ? (
        <>
          <Link
            id="wd-course-piazza-link"
            to="/Kanbas/Account/Profile"
            className={`list-group-item ${
              pathname.includes("Profile") ? "active" : "text-danger"
            } border border-0`}
          >
            Profile
          </Link>
          {currentUser && currentUser.role === "ADMIN" && (
            <>
              <Link
                to={`/Kanbas/Account/Users`}
                className={`list-group-item ${
                  pathname.includes("Users") ? "active" : "text-danger"
                } border border-0`}
              >
                Users
              </Link>
              <br />
            </>
          )}
        </>
      ) : (
        <>
          <Link
            id="wd-course-home-link"
            to="/Kanbas/Account/Signin"
            className={`list-group-item ${
              pathname.includes("Signin") ? "active" : "text-danger"
            } border border-0`}
          >
            Signin
          </Link>
          <br />
          <Link
            id="wd-course-modules-link"
            to="/Kanbas/Account/Signup"
            className={`list-group-item ${
              pathname.includes("Signup") ? "active" : "text-danger"
            } border border-0`}
          >
            Signup
          </Link>
          <br />
        </>
      )}
    </div>
  );
}

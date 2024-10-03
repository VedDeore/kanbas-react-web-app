import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input
        id="wd-username"
        placeholder="username"
        className="form-control mb-2"
        value="alice"
      />
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        className="form-control mb-2"
        value="123"
      />
      <input
        id="wd-firstname"
        placeholder="First Name"
        className="form-control mb-2"
        value="Alice"
      />
      <input
        id="wd-lastname"
        placeholder="Last Name"
        className="form-control mb-2"
        value="Wonderland"
      />
      <input id="wd-dob" className="form-control mb-2" type="date" />
      <input
        id="wd-email"
        className="form-control mb-2"
        value="alice@wonderland"
        type="email"
      />
      <select id="wd-role" className="form-select mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link
        id="wd-signout-link"
        to="/Kanbas/Account/Signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}

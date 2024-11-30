import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kanbas/Account/Profile");
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="wd-signup-screen">
      <h2
        className="fw-bold mb-4"
        style={{
          fontFamily: "Times New Roman, Segoe UI, San Francisco, Ubuntu",
        }}
      >
        Northeastern University
      </h2>
      <form onSubmit={signup}>
        <label htmlFor="wd-username">Username</label>
        <input
          value={user.username}
          id="wd-username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="form-control mb-2"
          placeholder="Username"
          required
        />
        <div className="mb-3">
          <label htmlFor="wd-password">Password</label>
          <div className="position-relative">
            <input
              value={user.password}
              id="wd-password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              className="form-control mb-2 pe-5"
              placeholder="Password"
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        <label htmlFor="wd-firstname">First Name</label>
        <input
          value={user.firstName}
          id="wd-firstname"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          className="form-control mb-2"
          placeholder="First Name"
          required
        />
        <label htmlFor="wd-lastname">Last Name</label>
        <input
          value={user.lastName}
          id="wd-lastname"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          className="form-control mb-2"
          placeholder="Last Name"
          required
        />
        <label htmlFor="wd-dob">Date of Birth</label>
        <input
          value={user.dob}
          id="wd-dob"
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
          className="form-control mb-2"
          type="date"
          required
        />
        <label htmlFor="wd-email">Email</label>
        <input
          value={user.email}
          id="wd-email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="form-control mb-2"
          placeholder="Email"
          required
        />
        <label htmlFor="wd-role">Role</label>
        <select
          value={user.role || ""}
          id="wd-role"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          className="form-select mb-2"
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="TA">Teaching Assistant</option>
        </select>
        <button
          id="wd-signup-btn"
          className="btn btn-danger mb-2 w-100"
          type="submit"
        >
          Sign up
        </button>
      </form>
      <Link
        to="/Kanbas/Account/Signin"
        id="wd-signin-link "
        className="btn btn-danger mb-2 w-100"
      >
        Sign in
      </Link>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kanbas/Dashboard");
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div id="wd-signin-screen" className="position-relative">
      <h2
        className="fw-bold mb-4"
        style={{
          fontFamily: "Times New Roman, Segoe UI, San Francisco, Ubuntu",
        }}
      >
        Northeastern University
      </h2>
      <form onSubmit={signin}>
        <label htmlFor="wd-username">myNortheastern Username</label>
        <input
          id="wd-username"
          placeholder="Username"
          defaultValue={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="form-control mb-2"
          required
        />
        <div className="mb-3">
          <label htmlFor="wd-password">myNortheastern Password</label>
          <div className="position-relative">
            <input
              id="wd-password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              defaultValue={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="form-control mb-2 pe-5"
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
        <button
          id="wd-signin-btn"
          className="btn btn-danger w-100 mb-2"
          type="submit"
        >
          Log In
        </button>
      </form>
      <Link
        id="wd-signup-link"
        to="/Kanbas/Account/Signup"
        className="btn btn-danger w-100"
      >
        Sign Up
      </Link>
    </div>
  );
}

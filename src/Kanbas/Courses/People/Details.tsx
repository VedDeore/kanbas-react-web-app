import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  const saveUser = async () => {
    const [firstName, lastName = ""] = name.split(" ");
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email: email || user.email,
      role: role || user.role,
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(-1)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="">
        {!editing && (
          <FaPencil
            onClick={() => {
              setEditing(true);
              setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
              setEmail(user.email || "");
              setRole(user.role || "");
            }}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <>
            <div
              className="text-danger fs-4 wd-name"
              onClick={() => {
                setEditing(true);
                setName(
                  `${user.firstName || ""} ${user.lastName || ""}`.trim()
                );
                setEmail(user.email || "");
                setRole(user.role || "");
              }}
            >
              {user.firstName} {user.lastName}
            </div>
            <div className="wd-details">
              <b>Role:</b> <span className="wd-roles"> {user.role} </span>
              <br />
              <b>Email:</b> <span className="wd-email"> {user.email} </span>
              <br />
            </div>
          </>
        )}
        {user && editing && (
          <>
            <input
              className="form-control w-50 wd-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
            <br />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select w-50 wd-edit-role"
            >
              <option value="STUDENT">Student</option>
              <option value="TA">Assistant</option>{" "}
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrator</option>
            </select>
            <br />
            <input
              className="form-control w-50 wd-edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
            <br />
          </>
        )}
      </div>
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>
      <br />
      <b>Total Activity:</b>
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}

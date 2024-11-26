import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <form>
        {profile && (
          <div>
            <input
              defaultValue={profile.username}
              id="wd-username"
              placeholder="username"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <input
              defaultValue={profile.password}
              id="wd-password"
              placeholder="password"
              type="password"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
              required
            />
            <input
              defaultValue={profile.firstName}
              id="wd-firstname"
              placeholder="First Name"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              required
            />
            <input
              defaultValue={profile.lastName}
              id="wd-lastname"
              placeholder="Last Name"
              className="form-control mb-2"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              required
            />
            <input
              defaultValue={profile.dob}
              id="wd-dob"
              className="form-control mb-2"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              type="date"
              required
            />
            <input
              defaultValue={profile.email}
              id="wd-email"
              className="form-control mb-2"
              type="email"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              required
            />
            <div id="wd-role" className="form-control mb-2">
              {profile.role}
            </div>
            <button
              onClick={updateProfile}
              className="btn btn-primary w-100 mb-2"
            >
              Update
            </button>
            <button
              onClick={signout}
              className="btn btn-danger w-100 mb-2"
              id="wd-signout-btn"
            >
              Sign out
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

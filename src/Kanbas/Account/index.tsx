import { Navigate, Route, Routes } from "react-router";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Users from "./Users";
import UsersRoute from "./UsersRoute";
export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div
      id="wd-account-screen"
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  currentUser
                    ? "/Kanbas/Account/Profile"
                    : "/Kanbas/Account/Signin"
                }
              />
            }
          />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/Users/*"
            element={
              <UsersRoute>
                <Routes>
                  <Route path="" element={<Users />} />
                  <Route path=":uid" element={<Users />} />
                </Routes>
              </UsersRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UsersRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (!currentUser) {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }
  if (currentUser.role !== "ADMIN") {
    return <Navigate to="/Kanbas/Account/Profile" />;
  }
  return children;
}

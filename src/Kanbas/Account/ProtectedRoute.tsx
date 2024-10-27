import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: any }) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  if (currentUser) {
    if (cid) {
      const isEnrolled = enrollments.some(
        (enrollment: any) =>
          enrollment.user === currentUser._id && enrollment.course === cid
      );
      if (!isEnrolled) {
        return <Navigate to="/Kanbas/Dashboard" />;
      }
    }
    return children;
  } else {
    return <Navigate to="/Kanbas/Account/Signin" />;
  }
}

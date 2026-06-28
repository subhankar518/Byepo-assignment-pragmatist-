import { Navigate } from "react-router-dom";

import { getUser, isLoggedIn } from "../utils/storage";

const ProtectedRoute = ({ children, role }) => {
  // Check if user is logged in
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Get logged-in user
  const user = getUser();

  // Check role
  if (user?.role !== role) {
    switch (user?.role) {
      case "SUPER-ADMIN":
        return <Navigate to="/super-admin/dashboard" replace />;

      case "ADMIN":
        return <Navigate to="/admin/dashboard" replace />;

      case "USER":
        return <Navigate to="/user/dashboard" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

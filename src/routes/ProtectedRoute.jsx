import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser, isAdmin } from "../utils/auth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (adminOnly && !isAdmin(user)) return <Navigate to="/products" replace />;
  return children;
}

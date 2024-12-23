import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const verifyToken = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const isAuthenticated = !!verifyToken;

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

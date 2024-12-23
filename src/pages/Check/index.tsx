import { Navigate } from "react-router-dom";

const Check: React.FC = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  console.log("lorem");
  console.log(user);

  if (user) {
    if (token && JSON.parse(user).role === "owner") {
      return <Navigate to="/board" />;
    }
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Explicitly return null if no conditions are met
  return null;
};

export default Check;

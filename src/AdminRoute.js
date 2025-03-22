import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;

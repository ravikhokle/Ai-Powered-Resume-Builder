import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
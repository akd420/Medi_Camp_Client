/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const DashboardRedirectRoute = ({ children }) => {
    const { user } = useAuth();
  
    return user ? (
        <Navigate to="/dashboard/profile" />
    ) : (
      <Navigate to="/login" />
    );
  };

export default DashboardRedirectRoute;

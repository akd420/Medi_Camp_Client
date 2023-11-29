/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Shared/Loading";
import Loader from "../Components/Shared/Loader";
const ParticipantRoutes = ({ children }) => {
  const { user } = useAuth();
  const { data, isLoading } = Loader(`users?email=${user?.email}`, "users");
  const location = useLocation();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (data.role === "participant") {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default ParticipantRoutes;

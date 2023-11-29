/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Shared/Loading";
import Loader from "../Components/Shared/Loader";

const OrganizerRoute = ({ children }) => {
  const { user } = useAuth();
  const { data, isLoading } = Loader(`users?email=${user?.email}`, "users");
  const location = useLocation();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (data.role === "organizer") {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default OrganizerRoute;

/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Shared/Loading";

const ProRoutes = ({ children }) => {
  const { user } = useAuth();
  const { data, isLoading } = Loader(`users?email=${user?.email}`, "users");
  const location = useLocation();
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (data.role === "professional") {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default ProRoutes;

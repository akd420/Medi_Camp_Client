import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoard from "../Pages/DashBoard/DashBoard";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import ContactUs from "../Pages/ContactUs/ContactUs";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import OrganizerProfile from "../Pages/DashBoard/Pages/Profile/OrganizerProfile";
import AddCamp from "../Pages/DashBoard/Pages/AddCamp";
import ManageCamps from "../Pages/DashBoard/Pages/ManageCamps";
import RegisteredCamps from "../Pages/DashBoard/Pages/RegisteredCamps";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/camps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/dashboard/organizer-profile",
        element: <OrganizerProfile></OrganizerProfile>,
      },
      {
        path: "/dashboard/add-camp",
        element: <AddCamp></AddCamp>,
      },
      {
        path: "/dashboard/manage-camps",
        element: <ManageCamps></ManageCamps>,
      },
      {
        path: "/dashboard/registered-camps",
        element: <RegisteredCamps></RegisteredCamps>,
      }
    ],
  },
]);

export default Router;

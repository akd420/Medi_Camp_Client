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
import AddCamp from "../Pages/DashBoard/Pages/AddCamp";
import ManageCamps from "../Pages/DashBoard/Pages/ManageCamps";
import RegisteredCamps from "../Pages/DashBoard/Pages/RegisteredCamps";
import CampDetails from "../Pages/DashBoard/Pages/CampDetails/CampDetails";
import Profile from "../Pages/DashBoard/Pages/Profile/Profile";
import PaymentHistory from "../Pages/DashBoard/Pages/PaymentHistory";
import Feedback from "../Pages/DashBoard/Pages/Feedback";

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
        path: "/camps/:id",
        element: <CampDetails></CampDetails>,
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
        path: "/dashboard/profile",
        element: <Profile></Profile>
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
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/feedback",
        element: <Feedback></Feedback>,
      }
    ],
  },
]);

export default Router;

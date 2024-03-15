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
import OrganizerRoute from "./OrganizerRoutes";
import ParticipantRoutes from "./ParticipantRoutes";
import NotProRoutes from "./NotProRoutes";
import AddUpcomingCamps from "../Pages/DashBoard/Pages/AddUpcomingCamps";
import UpDetails from "../Components/UpDetails";
import ManageUpcomingCamps from "../Pages/DashBoard/Pages/ManageUpcomingCamps";
import AcceptedCamps from "../Pages/DashBoard/Pages/AcceptedCamps";
import ProRoutes from "./ProRoutes";

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
        path: "/upCamps/:id",
        element: <UpDetails></UpDetails>,
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
        element: (
          <PrivateRoute>
            <Profile></Profile>,
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-camp",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <AddCamp></AddCamp>,
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-upcoming-camp",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <AddUpcomingCamps></AddUpcomingCamps>
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-camps",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageCamps></ManageCamps>,
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-upcoming-camps",
        element: (
          <PrivateRoute>
            <OrganizerRoute>
              <ManageUpcomingCamps></ManageUpcomingCamps>
            </OrganizerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/registered-camps",
        element: (
          <PrivateRoute>
            <NotProRoutes>
              <RegisteredCamps></RegisteredCamps>,
            </NotProRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoute>
            <ParticipantRoutes>
              <PaymentHistory></PaymentHistory>,
            </ParticipantRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/accepted-camps",
        element: (
          <PrivateRoute>
            <ProRoutes>
              <AcceptedCamps></AcceptedCamps>
            </ProRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/feedback",
        element: (
          <PrivateRoute>
            <ParticipantRoutes>
              <Feedback></Feedback>,
            </ParticipantRoutes>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;

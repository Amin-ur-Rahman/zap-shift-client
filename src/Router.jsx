import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Coverage from "./pages/Coverage";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";
import SendParcel from "./pages/SendParcel";
import PrivateRoute from "./private/PrivateRoute";
import Dashboard from "./layout/dashboard/Dashboard";
import MyParcels from "./pages/dashboard-pages/MyParcels";
import PaymentSuccess from "./pages/dashboard-pages/PaymentSuccess";
import PaymentCancelled from "./pages/dashboard-pages/PaymentCancelled";
import PaymentHistory from "./pages/dashboard-pages/PaymentHistory";
import BeARider from "./pages/BeARider";
import AproveRider from "./pages/dashboard-pages/AproveRider";
import ManageUsers from "./pages/dashboard-pages/ManageUsers";
import Unauthorized from "./pages/Unauthorized";
import AdminRoute from "./private/AdminRoute";
import AssignRiders from "./pages/AssignRiders";
import RiderRoute from "./private/RiderRoute";
import AssignedDeliveries from "./pages/dashboard-pages/AssignedDeliveries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            {" "}
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider></BeARider>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "register",
        element: <Registration></Registration>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels></MyParcels>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "approve-riders",
        element: (
          <PrivateRoute>
            <AproveRider></AproveRider>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized></Unauthorized>,
  },
]);

export default router;

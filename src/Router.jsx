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
    ],
  },
]);

export default router;

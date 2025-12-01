import React, { useContext } from "react";
import AuthContext from "../contexts/authContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="skeleton h-screen w-full"></div>;

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={location?.pathname}></Navigate>
  );
};

export default PrivateRoute;

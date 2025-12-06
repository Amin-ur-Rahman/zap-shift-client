import React from "react";
import useRole from "../contexts/useRole";

const RiderRoute = ({ children }) => {
  const { role, loading } = useRole();

  if (loading)
    return (
      <div>
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </div>
    );

  if (role.role !== "rider") {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RiderRoute;

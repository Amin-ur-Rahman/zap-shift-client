import React, { useContext } from "react";
import useAxiosInstance from "../../contexts/useAxiosInstance";
import AuthContext from "../../contexts/authContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

const AssignedDeliveries = () => {
  const axiosInstance = useAxiosInstance();
  const { user, loading: authLoading } = useContext(AuthContext);

  const { data: parcels, isLoading: parcelsLoading } = useQuery({
    queryKey: ["assigned-delivery"],
    queryFn: async () => {
      if (user && !authLoading) {
        const res = await axiosInstance.get(
          `/parcels/rider?email=${user?.email}`
        );
        return res.data;
      }
    },
  });

  if (authLoading || parcelsLoading)
    return (
      <div>
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  console.log(parcels);

  return (
    <div>
      <h1>assigned deliveries here ()</h1>
    </div>
  );
};

export default AssignedDeliveries;

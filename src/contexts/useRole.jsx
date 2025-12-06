import React, { useContext } from "react";
import useAxiosInstance from "./useAxiosInstance";
import AuthContext from "./authContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const axiosInstance = useAxiosInstance();
  const { user, loading: authLoading } = useContext(AuthContext);

  const {
    data: role,
    isLoading: roleLoading,
    isError,
  } = useQuery({
    queryKey: ["user role"],
    enabled: user && !authLoading,
    queryFn: async () => {
      const res = await axiosInstance.get(`/get-role?email=${user?.email}`);
      return res.data;
    },
  });

  //   console.log(role);

  return {
    role: role,
    loading: authLoading || roleLoading,
    error: isError,
  };
};

export default useRole;

import React, { useContext, useEffect } from "react";
import AuthContext from "./authContext/AuthContext";
import axiosInstance from "./AxiosInstance";

const useAxiosInstance = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user && user.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosInstance;

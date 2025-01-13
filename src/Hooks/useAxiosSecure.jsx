import axios from "axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:9000",
});
export const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (err) => Promise.reject(err)
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        const { response } = err;
        if (response?.status === 401 || response?.status === 403) {
          logoutUser();

          // Schedule navigation in a React-safe way
          setTimeout(() => {
            navigate("/login");
          }, 0);
        }
        return Promise.reject(err);
      }
    );

    // Cleanup interceptors when the component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logoutUser, navigate]);
  return axiosSecure;
};

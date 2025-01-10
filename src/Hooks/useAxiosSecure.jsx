import axios from "axios"
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:9000"
})
export const useAxiosSecure = () => {
  const {logoutUser} = useAuth();
  const navigate = useNavigate();
  // request interceptors header authorization for every secure axios http api call:
  axiosSecure.interceptors.request.use((config) =>{
    const token = localStorage.getItem("access-token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, (err) =>{
    return Promise.reject(err);
  });

  // check response for error code(401, 403) into interceptor:
  axiosSecure.interceptors.response.use((res) =>{
    return res;
  }, (err) =>{
    const {response} = err;
    if(response.status === 401 || response.status === 403){
      logoutUser();
      navigate("/login")
    }
    return Promise.reject(err);
  })

  return axiosSecure;
}

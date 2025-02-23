import axios from "axios"

const axiosPublic = axios.create({
  baseURL: "https://cox-crab-server.vercel.app"
})
export const useAxiosPublic = () => {
  return axiosPublic;
}

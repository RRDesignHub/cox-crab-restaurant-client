import axios from "axios"

const axiosPublic = axios.create({
  baseURL: "http://localhost:9000"
})
export const useAxiosPublic = () => {
  return axiosPublic;
}

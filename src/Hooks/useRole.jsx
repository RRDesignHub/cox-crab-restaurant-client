import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth"
import { useAxiosSecure } from "./useAxiosSecure";


export const useRole = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: isAdmin, isPending: isAdminPeinding} = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async() =>{
      try {
        const { data } = await axiosSecure.get(`/user/role/${user.email}`);
        return data?.isAdmin;
      } catch (err) {
        console.error("Error fetching user role:", err);
        return false; 
      }
    }
  })
  return [isAdmin, isAdminPeinding];
}

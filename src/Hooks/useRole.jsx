import { useAuth } from "./useAuth"
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";


export const useRole = () => {
  const {user, loader} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin = false, isPending: isAdminPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !!user?.email && !loader, // Only fetch if user is logged in and loader is false
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
      return data?.isAdmin;
    },
    onError: (err) => {
      console.error("Error fetching user role:", err);
    },
  });

  return [isAdmin, isAdminPending];
}

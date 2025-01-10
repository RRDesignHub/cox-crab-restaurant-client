import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxiosPublic";

export const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  const { data: menu = [], refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/menu`);
      return data;
    },
  });

  return [menu, refetch];
};

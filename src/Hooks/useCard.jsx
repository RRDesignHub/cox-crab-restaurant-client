import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./useAuth";

export const useCard = () => {
  const {user} = useAuth();
  const { data: card = [], refetch } = useQuery({
    queryKey: ["card"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cards?user=${user?.email}`);
      return data;
    },
  });

  return [card, refetch];
};

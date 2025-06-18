import { Restaurant } from "@/components/ui/restaurant-context-provider";
import { supabase } from "@/data/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedRestaurant: Partial<Restaurant>) => {
      const { data, error } = await supabase
        .from("Restaurant")
        .update(updatedRestaurant)
        .eq("id", updatedRestaurant.id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Restaurant"] });
    },
  });
};
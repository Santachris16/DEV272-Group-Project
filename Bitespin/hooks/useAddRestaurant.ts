import { Restaurant } from "@/components/ui/restaurant-context-provider";
import { supabase } from "@/data/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type SupabaseNewRestaurant = Omit<Restaurant, "id">;

export const useAddRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRestaurant: SupabaseNewRestaurant) => {
      const { data, error } = await supabase.from("Restaurant").insert(newRestaurant);
      if (error) {
        console.log(error.message)
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Restaurant"] });
    },
  });
};

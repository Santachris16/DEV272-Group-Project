import { Restaurant } from "@/components/ui/restaurant-context-provider";
import { supabase } from "@/data/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedRestaurant: Partial<Restaurant>) => {
      if (!updatedRestaurant.id) {
        throw new Error("Restaurant ID is required for an update.");
      }
      const { data, error } = await supabase
        .from("Restaurant")
        .update(updatedRestaurant)
        .eq("id", updatedRestaurant.id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data as Restaurant;
    },
    
    onSuccess: (updatedRestaurant: Restaurant) => {
      queryClient.setQueryData(
        ['Restaurant'],
        (oldData: Restaurant[] | undefined) => {
          if (!oldData) {
            return undefined;
          }
          return oldData.map((restaurant: Restaurant) =>
            restaurant.id === updatedRestaurant.id
              ? updatedRestaurant
              : restaurant
          );
        }
      );
    },
  });
};
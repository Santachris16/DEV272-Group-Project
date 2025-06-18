import { supabase } from "@/data/supabase";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurants = () => {
    return useQuery ({
        queryKey: ["Restaurant"],
        queryFn: async () => {
            const { data, error } = await supabase.from("Restaurant").select("*");
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    })
}
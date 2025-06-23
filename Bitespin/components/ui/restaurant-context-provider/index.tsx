import React, { createContext, useContext, useEffect, useState } from "react";
// import restaurantData from '@/data/restaurantsList.json'
import { useGetRestaurants } from "@/hooks/useGetRestaurants";
import { SupabaseNewRestaurant, useAddRestaurant } from "@/hooks/useAddRestaurant";
import { useDeleteRestaurant } from "@/hooks/useDeleteRestaurant";
import { useUpdateRestaurant } from "@/hooks/useUpdateRestaurant";

export type Restaurant = {
    id: string;
    title: string;
    genre: string;
    location: string;
    photo: string;
    rating: number;
    visited: boolean;
    favorite: boolean;
};

type RestaurantContextType = {
    isLoading: boolean;
    restaurants: Restaurant[];
    addRestaurant: (restaurant: SupabaseNewRestaurant) => void;
    updateRestaurant: (updatedRestaurant: Partial<Restaurant>) => void;
    deleteRestaurant: (id: string) => void;
    toggleVisited: (id: string) => void;
    toggleFavorite: (id: string) => void;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(
    undefined,
);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { data, isFetching } = useGetRestaurants();
    const [ restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const addRestaurantMutation = useAddRestaurant();
    const deleteRestaurantMutation = useDeleteRestaurant();
    const updateRestaurantMutation = useUpdateRestaurant();

    const addRestaurant = (restaurant: SupabaseNewRestaurant) => {
        addRestaurantMutation.mutate(restaurant);
    };

    const updateRestaurant = (updatedRestaurant: Partial<Restaurant>) => {
        updateRestaurantMutation.mutate(updatedRestaurant);
    };

    const deleteRestaurant = async (restaurantId: Restaurant["id"]) => {
        deleteRestaurantMutation.mutate(restaurantId);
    };

    const toggleFavorite = (id: string) => {
        const restaurantToToggle = restaurants.find(
            (restaurant) => restaurant.id === id,
        );
        if (!restaurantToToggle) return;
        updateRestaurant({
            ...restaurantToToggle,
            favorite: !restaurantToToggle.favorite,
        })
    };
    
    const toggleVisited = (id: string) => {
        const restaurantToToggle = restaurants.find(
            (restaurant) => restaurant.id === id,
        );
        if (!restaurantToToggle) return;
        updateRestaurant({
            ...restaurantToToggle,
            visited: !restaurantToToggle.visited,
        })
    };

    useEffect(() => {
        if (data && !isFetching) {
            setRestaurants(data as Restaurant[])
        }
    }, [data, isFetching]);

    return (
        <RestaurantContext.Provider
            value={{
                isLoading: 
                    isFetching ||
                    addRestaurantMutation.isPending ||
                    deleteRestaurantMutation.isPending ||
                    updateRestaurantMutation.isPending,
                restaurants,
                addRestaurant,
                updateRestaurant,
                deleteRestaurant,
                toggleVisited,
                toggleFavorite
            }}
        >
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurantContext = () => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error(
            "useRestaurantContext must be used within a RestaurantProvider",
        );
    }
    return context;
};
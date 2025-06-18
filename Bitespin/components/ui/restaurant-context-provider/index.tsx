import React, { createContext, useContext, useEffect, useState } from "react";
// import restaurantData from '@/data/restaurantsList.json'
import { useGetRestaurants } from "@/hooks/useGetRestaurants";
import { SupabaseNewRestaurant, useAddRestaurant } from "@/hooks/useAddRestaurant";

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
    updateRestaurant: (id: string, updatedRestaurant: Partial<Restaurant>) => void;
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
    // const [ restaurants, setRestaurants] = useState<Restaurant[]>(restaurantData as Restaurant[]);
    const [ restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const addRestaurantMutation = useAddRestaurant();

    const addRestaurant = (restaurant: SupabaseNewRestaurant) => {
        addRestaurantMutation.mutate(restaurant);
    };

    const updateRestaurant = (id: string, updatedRestaurant: Partial<Restaurant>) => {
        setRestaurants((prev) =>
            prev.map((restaurant) => 
                restaurant.id === id ? { ...restaurant, ...updatedRestaurant } : restaurant
            )
        );
    };

    const deleteRestaurant = (id: string) => {
        setRestaurants((prev) =>
            prev.filter((restaurant) => restaurant.id !== id)
        );
    };

    const toggleFavorite = (id: string) => {
        setRestaurants((prev) =>
            prev.map((restaurant) =>
                restaurant.id === id ? { ...restaurant, favorite: !restaurant.favorite } : restaurant
            )
        );
    };
    
    const toggleVisited = (id: string) => {
        setRestaurants((prev) =>
            prev.map((restaurant) =>
                restaurant.id === id ? { ...restaurant, visited: !restaurant.visited } : restaurant
            )
        );
    };

    useEffect(() => {
        if (data && !isFetching) {
            setRestaurants(data as Restaurant[])
        }
    }, [data, isFetching]);

    return (
        <RestaurantContext.Provider
            value={{
                isLoading: isFetching,
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
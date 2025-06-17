import React, { createContext, useContext, useState } from "react";
import restaurantData from '@/data/restaurantsList.json'

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
    restaurants: Restaurant[];
    addRestaurant: (restaurant: Restaurant) => void;
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
    const [ restaurants, setRestaurants] = useState<Restaurant[]>(restaurantData as Restaurant[]);

    const addRestaurant = (restaurant: Restaurant) => {
        setRestaurants((prev) => [...prev, restaurant]);
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

    return (
        <RestaurantContext.Provider
            value={{
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
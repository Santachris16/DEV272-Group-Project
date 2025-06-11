import { createContext, useContext, useState } from "react";
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
    // addRestaurant: (restaurant: Restaurant) => void;
    // updateRestaurant: (updatedRestaurant: Partial<Restaurant>) => void;
    // deleteRestaurant: (id: string) => void;
    // toggleVisited: (id: string) => void;
    // toggleFavorite: (id: string) => void;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(
    undefined,
);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [ restaurants, setRestaurants] = useState<Restaurant[]>(restaurantData as Restaurant[]);

    return (
        <RestaurantContext.Provider
            value={{
                restaurants
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
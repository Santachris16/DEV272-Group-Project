import React, { useMemo, useState } from "react";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { FlatList } from "react-native";
import RestaurantCard from "@/components/RestaurantCard";
import { useRestaurantContext } from "@/components/ui/restaurant-context-provider";


export default function FavoritesScreen() {
  const { restaurants } = useRestaurantContext();
  const [searchQuery, setSearchQuery] = useState('');

  const favoriteRestaurants = useMemo(
    () => restaurants.filter(item => item.favorite === true),
    [restaurants]
  );

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return favoriteRestaurants;
    }
    return favoriteRestaurants.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [favoriteRestaurants, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Favorites List
      </Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField 
          placeholder="Search Favorites..."
          onChangeText={handleSearch}
        />
      </Input>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => <RestaurantCard {...item} />}
      />
    </Box>
  );
}

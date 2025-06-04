import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { FlatList, TouchableOpacity } from "react-native";
import restaurantsData from '../../../data/restaurantsList.json';
import { useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";


export default function FavoritesScreen() {
  
  const [ favoriteRestaurants, setFavoriteRestaurants ] = useState(
    restaurantsData.filter(item => item.favorite === true)
  );

  const [ searchQuery, setSearchQuery ] = useState('');
  const [ filteredData, setFilteredData ] = useState(favoriteRestaurants);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = favoriteRestaurants.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
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

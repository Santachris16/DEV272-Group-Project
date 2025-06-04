import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { FlatList, TouchableOpacity } from "react-native";
import { Text } from '@/components/ui/text';
import { EditIcon, FavouriteIcon } from "@/components/ui/icon";
import { router } from "expo-router";
import restaurantsData from '../../../data/restaurantsList.json';
import { useState } from "react";
import RestaurantCard from "@/components/RestaurantCard";


export default function FavoritesScreen() {
  const favRestaurants = restaurantsData.filter(item => item.favorite === true)
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ filteredData, setFilteredData ] = useState(restaurantsData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = favRestaurants.filter((item) =>
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

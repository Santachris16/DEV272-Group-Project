import { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Fab, FabIcon } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';
import { useRestaurantContext } from "@/components/ui/restaurant-context-provider";

export default function ListScreen() {
  const router = useRouter();
  const { restaurants } = useRestaurantContext();
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ filteredData, setFilteredData ] = useState(restaurants);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = restaurants.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (searchQuery ==='') {
      setFilteredData(restaurants);
    } 
    else {
      const filtered = restaurants.filter((item) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [restaurants])

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Restaurant List
      </Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField
          placeholder="Search Restaurants..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </Input>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RestaurantCard {...item} />}
      />
      <Fab
        size='lg'
        className='bottom-32 dark:bg-zinc-700'
        onPress={() => router.push('/add')}>
        <FabIcon as={AddIcon} color="white"></FabIcon>
      </Fab>
    </Box>
  );
}
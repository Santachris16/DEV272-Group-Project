import { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import restaurantsData from '../../../data/restaurantsList.json';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Fab, FabIcon } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';

export default function ListScreen() {
  const router = useRouter();
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ filteredData, setFilteredData ] = useState(restaurantsData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = restaurantsData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Restaurant List
      </Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField 
          placeholder="Search Restaurants..."
          onChangeText={handleSearch}
        />
      </Input>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => <RestaurantCard {...item}/>}
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

import { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = searchQuery === ''
    ? restaurantsData
    : restaurantsData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Restaurant List
      </Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField
          placeholder="Search Restaurants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
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
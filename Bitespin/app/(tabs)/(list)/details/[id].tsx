import { router, useLocalSearchParams } from 'expo-router';
import restaurantData from '../../../../data/restaurantsList.json'
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Fab, FabIcon } from '@/components/ui/fab';
import { ArrowLeftIcon } from '@/components/ui/icon';


export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const restaurant = restaurantData.find((item) => item.id === id)

  return (

    <Box className='flex-1'>
      <Heading size="3xl" className="self-center p-2">{restaurant?.title}</Heading>
      <Box className='flex-2 m-2 items-center justify-items-center'>
        <Image
        className='rounded-3xl'
          size='2xl'
          source={{
            uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
          }}
          alt="image"
        />
      </Box>
      <Box className='flex-1 p-4'>
        <Text>Genre: {restaurant?.genre}</Text>
        <Text>Location: {restaurant?.location}</Text>
        <Text>Rating: {restaurant?.rating}</Text>
        <Text>Visited: {restaurant?.visited ? "Visited" : "Not yet visited"}</Text>
      </Box>
      <Fab
        size='lg'
        className='origin-bottom-right dark:bg-zinc-700'
        onPress={() => router.back()}>
        <FabIcon as={ArrowLeftIcon} color="white"></FabIcon>
      </Fab>
    </Box>
  );
}

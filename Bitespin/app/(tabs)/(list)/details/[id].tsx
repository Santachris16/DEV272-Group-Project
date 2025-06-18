import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Fab, FabIcon } from '@/components/ui/fab';
import { ArrowLeftIcon, FavouriteIcon, Icon } from '@/components/ui/icon';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { restaurants } = useRestaurantContext();
  const restaurant = restaurants.find((item) => item.id === id)

  return (

    <Box className='flex-1'>
      <Heading size="3xl" className="self-center p-2">{restaurant?.title}</Heading>
      {restaurant?.favorite ?
        <Icon
          as={FavouriteIcon}
          size='xl'
          color={"red"}
          className='absolute inset-5'
        />:null
      }
      <Box className='flex-2 m-2 items-center justify-items-center'>
        <Image
        className='rounded-3xl'
          size='2xl'
          source={{
            uri: restaurant?.photo,
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

import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';
import { Alert } from 'react-native';


export default function DeleteItemScreen() {
  const { id } = useLocalSearchParams();
  const { restaurants, deleteRestaurant } = useRestaurantContext();
  const restaurant = restaurants.find((item) => item.id === id)
  const router = useRouter();

    const handleDelete = () => {
        if (typeof id !== 'string') return;

        deleteRestaurant(id);

        Alert.alert(
            "Deleted!",
            `${restaurant?.title} has been removed.`,
            [
                {
                    text: 'OK',
                    onPress: () => router.navigate('/(tabs)/(list)/list'),
                },
            ]
        );
    };

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2 dark:text-white">Delete {restaurant?.title}?</Heading>
      <Box className='m-4'>
        <Button className='mb-4' action='positive' onPress={handleDelete}>
          <ButtonText>Yes</ButtonText>
        </Button>
        <Button action='negative' onPress={() => router.back()}>
          <ButtonText>No</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}

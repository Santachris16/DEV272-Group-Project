import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';

export default function HomeScreen() {
  const router = useRouter();
  const { restaurants } = useRestaurantContext();
  const [ filteredData, setFilteredData ] = useState(restaurants);

  function getRandomNumber(maxValue: number): number {
    if (maxValue <= 0) {
      console.log("MaxValue must be greater than 0")
      return 0
    } 
    return Math.floor(Math.random() * maxValue);
  };

  const selectRandomRestaurant = () => {
    const randomRestaurant = getRandomNumber(restaurants.length)
    router.push(`/(tabs)/(list)/details/${randomRestaurant}`)
  };

  const selectRandomFavorite = () => {
    const filtered = restaurants.filter((item) => item.favorite === true)
    setFilteredData(filtered)
    const randomIndex = getRandomNumber(filteredData.length)
    const randomFavorite = filteredData[randomIndex].id
    router.push(`/(tabs)/(list)/details/${randomFavorite}`)
  };

  const selectRandomVisited = () => {
    const filtered = restaurants.filter((item) => item.visited === true)
    setFilteredData(filtered)
    const randomIndex = getRandomNumber(filteredData.length)
    const randomVisited = filteredData[randomIndex].id
    router.push(`/(tabs)/(list)/details/${randomVisited}`)
  };

  const selectRandomUnvisited = () => {
    const filtered = restaurants.filter((item) => item.visited === false)
    setFilteredData(filtered)
    const randomIndex = getRandomNumber(filteredData.length)
    const randomUnvisited = filteredData[randomIndex].id
    router.push(`/(tabs)/(list)/details/${randomUnvisited}`)
  };

  return (

    <Box className='flex-1'>
      <Heading size="3xl" className="self-center mt-2">Bitespin</Heading>
      <Text className="self-center">Random restaurant picker</Text>
      <Box className='flex-1 p-1 ml-2 mr-2'>

        <Button 
          className='flex-1 m-2 rounded-2xl'
          onPress={selectRandomRestaurant}
        >
          <ButtonText>Random Restaurant</ButtonText>
        </Button>

        <Button 
          className='flex-1 m-2 rounded-2xl' 
          onPress={selectRandomFavorite}
        >
          <ButtonText>Random Favorite</ButtonText>
        </Button>

        <Button 
          className='flex-1 m-2 rounded-2xl' 
          onPress={selectRandomUnvisited}
        >
          <ButtonText>Random Unvisited</ButtonText>
        </Button>

        <Button 
          className='flex-1 m-2 rounded-2xl' 
          onPress={selectRandomVisited}
        >
          <ButtonText>Random Visited</ButtonText>
        </Button>

      </Box>
    </Box>
  );
}

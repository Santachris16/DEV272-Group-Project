import React from 'react';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Restaurant, useRestaurantContext } from '@/components/ui/restaurant-context-provider';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';

export default function HomeScreen() {
  const router = useRouter();
  const { restaurants } = useRestaurantContext();
  const [ filteredData, setFilteredData ] = useState(restaurants);
  const [ showModal, setShowModal ] = useState(false);
  const [ displayData, setDisplayData ] = useState<Restaurant>();
  const [ selectionFunction, setSelectionFunction ] = useState("");

  function getRandomNumber(maxValue: number): number {
    if (maxValue <= 0) {
      console.log("MaxValue must be greater than 0")
      return 0
    } 
    return Math.floor(Math.random() * maxValue);
  };

  const selectRandomRestaurant = () => {
    setSelectionFunction("All")
    const data = restaurants
    const randomIndex = getRandomNumber(data.length)
    const randomRestaurant = restaurants[randomIndex]
    // router.push(`/(tabs)/(list)/details/${randomRestaurant}`)
    setDisplayData(randomRestaurant)
    setShowModal(true)
  };

  const selectRandomFavorite = () => {
    setSelectionFunction("Favorites")
    const filtered = restaurants.filter((item) => item.favorite === true)
    setFilteredData(filtered)
    const randomIndex = getRandomNumber(filteredData.length)
    const randomFavorite = filteredData[randomIndex]
    // router.push(`/(tabs)/(list)/details/${randomFavorite}`)
    setDisplayData(randomFavorite)
    setShowModal(true)
  };

  const selectRandomVisited = () => {
    setSelectionFunction("Visited")
    const filtered = restaurants.filter((item) => item.visited === true)
    setFilteredData(filtered)
    const randomIndex = getRandomNumber(filteredData.length)
    const randomVisited = filteredData[randomIndex]
    // router.push(`/(tabs)/(list)/details/${randomVisited}`)
    setDisplayData(randomVisited)
    setShowModal(true)
  };

  const selectRandomUnvisited = () => {
    setSelectionFunction("Unvisited")
    const filtered = restaurants.filter((item) => item.visited === false)
    setFilteredData(filtered)
    const randomIndex = getRandomNumber(filteredData.length)
    const randomUnvisited = filteredData[randomIndex]
    // router.push(`/(tabs)/(list)/details/${randomUnvisited}`)
    setDisplayData(randomUnvisited)
    setShowModal(true)
  };

  function handleReroll() {
    
    switch (selectionFunction) {
      case "All":
        selectRandomRestaurant()
        break;
      case "Favorites":
        selectRandomFavorite()
        break;
      case "Visited":
        selectRandomVisited()
        break;
      case "Unvisited":
        selectRandomUnvisited()
        break;
      default:
        return null;
    }
  };

  return (

    <Box className='flex-1'>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      >
        <ModalBackdrop/>
        <ModalContent>
          <ModalHeader>
            <Heading>{displayData?.title}</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} className="stroke-background-500" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Image
              className='rounded-xl'
              size='xl'
              source={{
                uri: displayData?.photo,
              }}
              alt="image"
            />
            <Text>Genre: {displayData?.genre}</Text>
            <Text>Rating: {displayData?.rating}</Text>
            <Text>Location: {displayData?.location}</Text>
            <Text>Visited: {displayData?.visited ? "Yes" : "No"}</Text>
            <Text>{displayData?.favorite ? "Favorited" : null}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onPress={handleReroll}>
              <ButtonText>Reroll</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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

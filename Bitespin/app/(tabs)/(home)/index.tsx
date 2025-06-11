import React from 'react';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { Restaurant, useRestaurantContext } from '@/components/ui/restaurant-context-provider';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Image } from '@/components/ui/image';
import { Divider } from '@/components/ui/divider';

export default function HomeScreen() {
  const router = useRouter();
  const { restaurants } = useRestaurantContext();
  const [ showModal, setShowModal ] = useState(false);
  const [ displayData, setDisplayData ] = useState<Restaurant>();
  const [ selectionFunction, setSelectionFunction ] = useState("");

  // Gets a random number and takes a max value as a parameter

  function getRandomNumber(maxValue: number): number {
    if (maxValue <= 0) {
      console.log("MaxValue must be greater than 0")
      return 0
    } 
    return Math.floor(Math.random() * maxValue);
  };

  // Takes a list of restaurants and a string representing the Random function to use

  const handleSelection = (data: Restaurant[], selectionType: string) => {
    setSelectionFunction(selectionType);
    if (data.length > 0) {
        const randomIndex = getRandomNumber(data.length);
        const randomItem = data[randomIndex];

        // Rerolls if the result is the same as the currently displayed data

        if (randomItem === displayData) {
          handleSelection(data, selectionType)
          return;
        }
        setDisplayData(randomItem);
        setShowModal(true);
    } else {
        console.log(`No restaurants found for selection: ${selectionType}`);
        alert(`No "${selectionType}" restaurants found to choose from!`);
    }
  };
  
  // Selection functions

  const selectRandomRestaurant = () => 
    handleSelection(restaurants, "All");

  const selectRandomFavorite = () => 
    handleSelection(restaurants.filter(item => item.favorite), "Favorites");

  const selectRandomVisited = () => 
    handleSelection(restaurants.filter(item => item.visited), "Visited");

  const selectRandomUnvisited = () => 
    handleSelection(restaurants.filter(item => !item.visited), "Unvisited");

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
            <Heading className='mx-auto' size='xl'>{displayData?.title}</Heading>
          </ModalHeader>
          <ModalBody>
            <Image
              className='rounded-xl m-4 mx-auto'
              size='2xl'
              source={{
                uri: displayData?.photo,
              }}
              alt="image"
            />
            <Divider className='mb-2'></Divider>
            <Text>Genre: {displayData?.genre}</Text>
            <Text>Rating: {displayData?.rating}</Text>
            <Text>Location: {displayData?.location}</Text>
            <Text>Visited: {displayData?.visited ? "Yes" : "No"}</Text>
            <Text>{displayData?.favorite ? "Favorited" : null}</Text>
            <Divider className='mt-2'></Divider>
          </ModalBody>
          <ModalFooter className='justify-around'>
            <Button onPress={handleReroll}>
              <ButtonText>Reroll</ButtonText>
            </Button>
            <Button onPress={() => {
                setShowModal(false)
              }}>
              <ButtonText>Close</ButtonText>
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

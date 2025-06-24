import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { Restaurant, useRestaurantContext } from '@/components/ui/restaurant-context-provider';
const placeholderImage = require('../../../assets/images/restaurantPlaceholder.png')

export default function HomeScreen() {
  const { restaurants } = useRestaurantContext();
  const [showModal, setShowModal] = useState(false);
  const [displayData, setDisplayData] = useState<Restaurant>();
  const [selectionFunction, setSelectionFunction] = useState("");
  const [imageSource, setImageSource] = useState<any>(placeholderImage);


  function getRandomNumber(maxValue: number): number {
    if (maxValue <= 0) {
      console.log("⚠️ MaxValue must be greater than 0");
      return 0;
    }
    return Math.floor(Math.random() * maxValue);
  }

  const handleSelection = (data: Restaurant[], selectionType: string) => {
    // console.log(`🎯 Selection type: ${selectionType}`);
    // console.log("📋 Candidate list:", data);

    setSelectionFunction(selectionType);

    if (data.length > 0) {
      const randomIndex = getRandomNumber(data.length);
      const randomItem = data[randomIndex];

      if (randomItem === displayData) {
        handleSelection(data, selectionType); // reroll if same
        return;
      }

      if (randomItem.photo) {
        setImageSource({ uri: randomItem.photo });
      } else {
        setImageSource(placeholderImage);
      }

      console.log("✅ Selected restaurant:", randomItem);
      setDisplayData(randomItem);
      setShowModal(true);
    } else {
      console.warn(`⚠️ No restaurants found for selection: ${selectionType}`);
      alert(`No "${selectionType}" restaurants found to choose from!`);
    }
  };

  const selectRandomRestaurant = () => {
    // console.log("🍽️ All restaurants:", restaurants);
    handleSelection(restaurants, "All");
  };

  const selectRandomFavorite = () =>
    handleSelection(restaurants.filter(item => item.favorite), "Favorites");

  const selectRandomVisited = () =>
    handleSelection(restaurants.filter(item => item.visited), "Visited");

  const selectRandomUnvisited = () =>
    handleSelection(restaurants.filter(item => !item.visited), "Unvisited");

  const handleReroll = () => {
    switch (selectionFunction) {
      case "All":
        selectRandomRestaurant();
        break;
      case "Favorites":
        selectRandomFavorite();
        break;
      case "Visited":
        selectRandomVisited();
        break;
      case "Unvisited":
        selectRandomUnvisited();
        break;
      default:
        break;
    }
  };

  return (
    <Box className="flex-1">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading className="mx-auto" size="xl">
              {displayData?.title ?? "No title available"}
            </Heading>
          </ModalHeader>
          <ModalBody>
            <Image
              className="rounded-xl m-4 mx-auto"
              size="2xl"
              source={imageSource}
              alt="image"
              onError={ () => {
                console.log("Image failed to load, falling back to placeholder.");
                setImageSource(placeholderImage);  
              }}
            />
            <Divider className="mb-2" />
            <Text>Genre: {displayData?.genre ?? "N/A"}</Text>
            <Text>Rating: {displayData?.rating ?? "N/A"}</Text>
            <Text>Location: {displayData?.location ?? "N/A"}</Text>
            <Text>Visited: {displayData?.visited ? "Yes" : "No"}</Text>
            <Text>{displayData?.favorite ? "Favorited" : "Not Favorited"}</Text>
            <Divider className="mt-2" />
          </ModalBody>
          <ModalFooter className="justify-around">
            <Button onPress={handleReroll}>
              <ButtonText>Reroll</ButtonText>
            </Button>
            <Button onPress={() => setShowModal(false)}>
              <ButtonText>Close</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Heading size="3xl" className="self-center mt-2 dark:text-white">Bitespin</Heading>
      <Text className="self-center dark:text-white">Random restaurant picker</Text>
      <Box className='flex'>
        <Image
          className='flex mx-auto'
          size='2xl'
          source={{
            uri: 'https://cdn.pixabay.com/photo/2021/12/16/03/04/spin-the-wheel-6873663_1280.png'
          }}
          alt="Spinning wheel image"
        />
      </Box>
      <Box className="flex-1 p-1 mx-2">
        <Button className="bg-slate-300 flex-1 mx-2 mb-2 rounded-2xl" onPress={selectRandomRestaurant}>
          <ButtonText className='text-black'>Random Restaurant</ButtonText>
        </Button>
        <Button className="bg-slate-300 flex-1 m-2 rounded-2xl" onPress={selectRandomFavorite}>
          <ButtonText className='text-black'>Random Favorite</ButtonText>
        </Button>
        <Button className="bg-slate-300 flex-1 m-2 rounded-2xl" onPress={selectRandomUnvisited}>
          <ButtonText className='text-black'>Random Unvisited</ButtonText>
        </Button>
        <Button className="bg-slate-300 flex-1 m-2 rounded-2xl" onPress={selectRandomVisited}>
          <ButtonText className='text-black'>Random Visited</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}

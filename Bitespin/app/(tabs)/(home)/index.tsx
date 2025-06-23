import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { Text } from '@/components/ui/text';
import React, { useEffect, useState } from 'react';
import { Restaurant, useRestaurantContext } from '@/components/ui/restaurant-context-provider';
// import { supabase } from '../../../data/supabase'; // adjust if needed

// export interface Restaurant {
//   id: number;
//   title: string;
//   genre: string;
//   location: string;
//   photo: string;
//   rating: number;
//   visited: boolean;
//   favorite: boolean;
// }

export default function HomeScreen() {
  // const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const { restaurants } = useRestaurantContext();
  const [showModal, setShowModal] = useState(false);
  const [displayData, setDisplayData] = useState<Restaurant>();
  const [selectionFunction, setSelectionFunction] = useState("");

  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     const { data, error } = await supabase
  //       .from('Restaurant')
  //       .select('*');

  //     if (error) {
  //       console.error('❌ Supabase fetch error:', error.message);
  //       return;
  //     }

  //     console.log("✅ Supabase data received:", data);
  //     setRestaurants(data || []);
  //   };

  //   fetchRestaurants();
  // }, []);

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
              source={{ uri: displayData?.photo ?? 'https://via.placeholder.com/300' }}
              alt="image"
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

      <Heading size="3xl" className="self-center mt-2">Bitespin</Heading>
      <Text className="self-center">Random restaurant picker</Text>
      <Box className="flex-1 p-1 ml-2 mr-2">
        <Button className="flex-1 m-2 rounded-2xl" onPress={selectRandomRestaurant}>
          <ButtonText>Random Restaurant</ButtonText>
        </Button>
        <Button className="flex-1 m-2 rounded-2xl" onPress={selectRandomFavorite}>
          <ButtonText>Random Favorite</ButtonText>
        </Button>
        <Button className="flex-1 m-2 rounded-2xl" onPress={selectRandomUnvisited}>
          <ButtonText>Random Unvisited</ButtonText>
        </Button>
        <Button className="flex-1 m-2 rounded-2xl" onPress={selectRandomVisited}>
          <ButtonText>Random Visited</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}

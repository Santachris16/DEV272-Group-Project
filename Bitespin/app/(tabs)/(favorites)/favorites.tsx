import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { FlatList, TouchableOpacity } from "react-native";
import { Text } from '@/components/ui/text';
import { EditIcon, FavouriteIcon } from "@/components/ui/icon";
import { router } from "expo-router";
import restaurantsData from '../../../data/restaurantsList.json';


export default function FavoritesScreen() {
  const favRestaurants = restaurantsData.filter(item => item.favorite === true)

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Favorites List
      </Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder="Search Favorites..."></InputField>
      </Input>
      <FlatList
        data={favRestaurants}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/(tabs)/(list)/details/${item.id}`)}>
            <Card size="md" variant="elevated" className="m-3">
              <HStack space="md">
                <Box className='flex-2 justify-center'>
                  <Button onPress={() => router.push(`/(tabs)/(list)/edit/${item.id}`)}>
                    <ButtonIcon as={EditIcon}></ButtonIcon>
                  </Button>
                </Box>
                <Box className='flex-1'>
                  <Heading size="md" className="mb-1 text-center">
                    {item.title}
                  </Heading>
                  <Text size="sm" className='text-center'>{item.location}</Text>
                </Box>
                <Box className='flex-2 justify-center'>
                  <Button onPress={() =>{item.favorite}}>
                    <ButtonIcon 
                      as={FavouriteIcon}
                      color={item.favorite ? "red" : "white"}
                    />
                  </Button>
                </Box>
              </HStack>
            </Card>
          </TouchableOpacity>
        )}>
      </FlatList>
    </Box>
  );
}

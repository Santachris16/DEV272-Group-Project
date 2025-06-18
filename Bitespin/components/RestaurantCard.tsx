import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Box } from "./ui/box";
import { EditIcon, FavouriteIcon, Icon } from "./ui/icon";
import { useRouter } from "expo-router";
import { Heading } from "./ui/heading";
import { Text } from '@/components/ui/text';
import { Restaurant, useRestaurantContext } from "./ui/restaurant-context-provider";

export default function RestaurantCard({ id, title, genre, rating, favorite }: Restaurant) {
    const { toggleFavorite } = useRestaurantContext();
    const router = useRouter();

    return(
        <TouchableOpacity onPress={() => router.push(`/(tabs)/(list)/details/${id}`)}>
            <Card size="md" variant="elevated" className="m-3">
                <HStack space="md" className="items-center">
                    <Box className='pl-2'>
                        <TouchableOpacity onPress={() => router.push(`/(tabs)/(list)/edit/${id}`)}>
                            <Icon as={EditIcon} size='xl' color='black' />
                        </TouchableOpacity>
                    </Box>

                    <Box className='flex-1'>
                        <Heading size="lg" className="text-center mb-1">
                            {title}
                        </Heading>
                        <HStack>
                            <Text className='flex-1 text-center' size="md">{genre}</Text>
                            <Text className='flex-1 text-center' size="md">{rating}</Text>
                        </HStack>
                    </Box>

                    <Box className='pr-2'>
                        <TouchableOpacity onPress={() => toggleFavorite(id)}>
                            <Icon as={FavouriteIcon} size='xl' color={favorite ? "red" : "black"} />
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </Card>
        </TouchableOpacity>
    );
};
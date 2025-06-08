import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Box } from "./ui/box";
import { EditIcon, FavouriteIcon, Icon } from "./ui/icon";
import { useRouter } from "expo-router";
import { Heading } from "./ui/heading";
import { Text } from '@/components/ui/text';
import { Pressable } from "./ui/pressable";

export default function RestaurantCard({ id, title, genre, rating, favorite }: any) {
    const router = useRouter();

    const handleFavoriteToggle = () => {
        return
    };

    return(
        <TouchableOpacity onPress={() => router.push(`/(tabs)/(list)/details/${id}`)}>
            <Card size="md" variant="elevated" className="m-3">
                <HStack space="md" className="items-center">
                    <Box className='pl-2'>
                        <Pressable onPress={() => router.push(`/(tabs)/(list)/edit/${id}`)}>
                            <Icon as={EditIcon} size='xl' color='black' />
                        </Pressable>
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
                        <Pressable onPress={handleFavoriteToggle}>
                            <Icon as={FavouriteIcon} size='xl' color={favorite ? "red" : "black"} />
                        </Pressable>
                    </Box>
                </HStack>
            </Card>
        </TouchableOpacity>
    );
};
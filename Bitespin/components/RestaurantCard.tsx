import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "./ui/card";
import { HStack } from "./ui/hstack";
import { Box } from "./ui/box";
import { EditIcon, FavouriteIcon, Icon } from "./ui/icon";
import { useRouter } from "expo-router";
import { Heading } from "./ui/heading";
import { Text } from '@/components/ui/text';
import { Pressable } from "./ui/pressable";

export default function RestaurantCard(item: any) {
    const router = useRouter();

    const handleFavoriteToggle = () => {
        return
    };

    return(
        <TouchableOpacity onPress={() => router.push(`/(tabs)/(list)/details/${item.id}`)}>
            <Card size="md" variant="elevated" className="m-3">
                <HStack space="md">
                    <Box className='flex-2 justify-center'>
                        <Pressable onPress={() => router.push(`/(tabs)/(list)/edit/${item.id}`)}>
                            <Icon
                                as={EditIcon}
                                size='xl'
                                color='black'
                                className='ml-2'>
                            </Icon>
                        </Pressable>
                    </Box>
                    <Box className='flex-1'>
                        <Heading size="lg" className="mb-1 text-center">
                            {item.title}
                        </Heading>
                        <Box className="flex-1 flex-row">
                            <Box className="flex-1">
                                <Text size="md" className='text-center'>{item.genre}</Text>
                            </Box>
                            <Box className="flex-1">
                                <Text size="md" className='text-center'>{item.rating}</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='flex-2 justify-center'>
                        <Pressable onPress={() => handleFavoriteToggle()}>
                            <Icon
                                as={FavouriteIcon}
                                size='xl'
                                color={item.favorite ? "red" : "black"}
                                className='mr-2'>
                            </Icon>
                        </Pressable>
                    </Box>
                </HStack>
            </Card>
        </TouchableOpacity>
    );
};
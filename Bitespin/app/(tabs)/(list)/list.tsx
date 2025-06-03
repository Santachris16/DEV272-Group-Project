import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import restaurantsData from '../../../data/restaurantsList.json';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Fab, FabIcon } from '@/components/ui/fab';
import { AddIcon, EditIcon, FavouriteIcon } from '@/components/ui/icon';
import { Button, ButtonIcon } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';

export default function ListScreen() {
  const router = useRouter();

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Restaurant List
      </Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder="Search Restaurants..."></InputField>
      </Input>
      <FlatList
        data={restaurantsData}
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
      <Fab
        size='lg'
        className='bottom-32 dark:bg-zinc-700'
        onPress={() => router.push('/add')}>
        <FabIcon as={AddIcon} color="white"></FabIcon>
      </Fab>
    </Box>
  );
}

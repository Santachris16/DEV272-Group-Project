import { TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import restaurantsData from '../../../data/restaurantsList.json';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Fab, FabIcon } from '@/components/ui/fab';
import { EditIcon } from '@/components/ui/icon';

export default function ListScreen() {
  const router = useRouter();

  return (
    <Box>
      <Heading size="3xl" className="self-center">
        Restaurant List
      </Heading>
      <TextInput placeholder="Search Restaurants" />
      <FlatList
        data={restaurantsData}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <Card size="md" variant="elevated" className="m-3">
            <Heading size="md" className="mb-1">
              {item.title}
            </Heading>
            <Text size="sm">{item.location}</Text>
          </Card>
        )}>
      </FlatList>
      <Fab
        size='lg'
        className='bottom-32 dark:bg-zinc-700'
        onPress={() => router.push('/add')}>
        <FabIcon as={EditIcon} color="white"></FabIcon>
      </Fab>
      {/* <Button title="Edit #1" onPress={() => router.push('./edit/1')} />
      <Button title="Delete #1" onPress={() => router.push('./delete/1')} />
      <Button title="Add New" onPress={() => router.push('/add')} /> */}
    </Box>
  );
}

import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import restaurantsData from 'Bitespin/tempfiles/restaurantsList.json';

export default function ListScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Restaurant List</Text>
      <TextInput placeholder="Search Restaurants" />
      <Text>• Restaurant #1</Text>
      <FlatList
        data={}
        keyExtractor={}
        renderItem={}>
        
      </FlatList>
      <Button title="Edit #1" onPress={() => router.push('./edit/1')} />
      <Button title="Delete #1" onPress={() => router.push('./delete/1')} />
      <Button title="Add New" onPress={() => router.push('/add')} />
    </View>
  );
}

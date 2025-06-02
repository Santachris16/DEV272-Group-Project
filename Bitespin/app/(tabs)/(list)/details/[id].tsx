import { View, Text, Button } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';


export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Restaurant Details for #{id}</Text>
      <Text>[Image Placeholder]</Text>
      <Text>[Info: Genre, Rating, Location, Visited]</Text>
      <Text>[Description Placeholder]</Text>
      <Button title='Return' onPress={() => router.back()}/>
    </View>
  );
}

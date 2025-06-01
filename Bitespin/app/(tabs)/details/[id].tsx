import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Restaurant Details for #{id}</Text>
      <Text>[Image Placeholder]</Text>
      <Text>[Info: Genre, Rating, Location, Visited]</Text>
      <Text>[Description Placeholder]</Text>
    </View>
  );
}

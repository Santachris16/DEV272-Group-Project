import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/button';

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

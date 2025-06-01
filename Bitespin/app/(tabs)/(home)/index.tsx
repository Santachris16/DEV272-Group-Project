import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Bitespin: Random Restaurant Picker</Text>
      <Button title="Random Restaurant" onPress={() => router.push('/details/1')} />
      <Button title="Random Favorite" onPress={() => router.push('/details/2')} />
      <Button title="Random Unvisited" onPress={() => router.push('/details/3')} />
      <Button title="Random Visited" onPress={() => router.push('/details/4')} />
    </View>
  );
}

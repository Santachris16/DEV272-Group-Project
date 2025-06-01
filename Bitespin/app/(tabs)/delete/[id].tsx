import { View, Text, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DeleteItemScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>Confirm Deletion of #{id}</Text>
      <Button title="Yes" onPress={() => alert('Deleted!')} />
      <Button title="No" onPress={() => router.back()} />
    </View>
  );
}

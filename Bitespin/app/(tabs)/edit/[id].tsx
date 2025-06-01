import { View, Text, TextInput, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditItemScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text> Edit Restaurant #{id}</Text>
      <TextInput placeholder="Autofilled Title" />
      <TextInput placeholder="Autofilled Genre" />
      <TextInput placeholder="Autofilled Location" />
      <TextInput placeholder="Autofilled Rating" />
      <TextInput placeholder="Visited" />
      <Button title="Confirm" onPress={() => alert('Updated!')} />
      <Button title="Delete" onPress={() => router.push(`/delete/${id}`)} />
    </View>
  );
}

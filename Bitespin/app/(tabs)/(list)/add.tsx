import { View, Text, TextInput, Button } from 'react-native';

export default function AddItemScreen() {
  return (
    <View>
      <Text>Add Restaurant</Text>
      <TextInput placeholder="Title" />
      <TextInput placeholder="Genre" />
      <TextInput placeholder="Location" />
      <TextInput placeholder="Rating" />
      <TextInput placeholder="Visited (true/false)" />
      <Button title="Confirm" onPress={() => alert('Added!')} />
    </View>
  );
}

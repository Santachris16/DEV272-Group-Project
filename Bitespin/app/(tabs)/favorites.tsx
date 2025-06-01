import { View, Text, TextInput } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View>
      <Text> Favorites</Text>
      <TextInput placeholder="Search Favorites" />
      <Text>• Favorite #1</Text>
      <Text>• Favorite #2</Text>
    </View>
  );
}

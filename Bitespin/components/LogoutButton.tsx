import { Button, View, StyleSheet } from 'react-native';
import { supabase } from '@/data/supabase';
import { useRouter } from 'expo-router';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <View>
      <Button title="Log Out" color="red" onPress={handleLogout} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 999,
//   },
// });
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  const router = useRouter();

  return (

    <Box className='flex-1'>
      
      <Heading size="3xl" className="self-center mt-2">Bitespin</Heading>
      <Text className="self-center">Random restaurant picker</Text>
      <Box className='flex-1 p-1 m-2'>

        <Button 
          className='flex-1 m-2 rounded-2xl'
          onPress={() => router.push('/(tabs)/(list)/details/1')}
        >
          <ButtonText>Random Restaurant</ButtonText>
        </Button>

        <Button 
          className='flex-1 m-2 rounded-2xl' 
          onPress={() => router.push('/(tabs)/(list)/details/2')}
        >
          <ButtonText>Random Favorite</ButtonText>
        </Button>

        <Button 
          className='flex-1 m-2 rounded-2xl' 
          onPress={() => router.push('/(tabs)/(list)/details/3')}
        >
          <ButtonText>Random Unvisited</ButtonText>
        </Button>

        <Button 
          className='flex-1 m-2 rounded-2xl' 
          onPress={() => router.push('/(tabs)/(list)/details/4')}
        >
          <ButtonText>Random Visited</ButtonText>
        </Button>

      </Box>
    </Box>

    // <View>
    //   <Text>Bitespin: Random Restaurant Picker</Text>
    //   <Button title="Random Restaurant" onPress={() => router.push('/(tabs)/(list)/details/1')} />
    //   <Button title="Random Favorite" onPress={() => router.push('/(tabs)/(list)/details/2')} />
    //   <Button title="Random Unvisited" onPress={() => router.push('/(tabs)/(list)/details/3')} />
    //   <Button title="Random Visited" onPress={() => router.push('/(tabs)/(list)/details/4')} />
    // </View>
  );
}

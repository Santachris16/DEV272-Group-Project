import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import restaurantData from '../../../../data/restaurantsList.json'

export default function DeleteItemScreen() {
  const { id } = useLocalSearchParams();
  const restaurant = restaurantData.find((item) => item.id === id)
  const router = useRouter();

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">Delete {restaurant?.title}?</Heading>
      <Button action='positive' onPress={() => alert('Deleted!')}>
        <ButtonText>Yes</ButtonText>
      </Button>
      <Button action='negative' onPress={() => router.back()}>
        <ButtonText>No</ButtonText>
      </Button>
    </Box>
  );
}

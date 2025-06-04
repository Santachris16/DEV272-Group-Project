import { useLocalSearchParams, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';

export default function DeleteItemScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">Delete #{id}?</Heading>
      <Button action='positive' onPress={() => alert('Deleted!')}>
        <ButtonText>Yes</ButtonText>
      </Button>
      <Button action='negative' onPress={() => router.back()}>
        <ButtonText>No</ButtonText>
      </Button>
    </Box>
  );
}

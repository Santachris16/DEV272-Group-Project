import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { router } from 'expo-router';

export default function AddItemScreen() {
  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">Add Restaurant</Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Title'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Genre'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Location'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Rating'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Visited'></InputField>
      </Input>
      <Button action='positive' onPress={() => alert('Added!')}>
        <ButtonText>Confirm</ButtonText>
      </Button>
      <Button action='negative' onPress={() => router.back()}>
        <ButtonText>Cancel</ButtonText>
      </Button>
    </Box>
  );
}

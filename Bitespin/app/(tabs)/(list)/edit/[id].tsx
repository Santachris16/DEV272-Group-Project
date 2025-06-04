import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
} from "@/components/ui/alert-dialog"
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import restaurantData from '../../../../data/restaurantsList.json'

export default function EditItemScreen() {
  const { id } = useLocalSearchParams();
  const restaurant = restaurantData.find((item) => item.id === id)
  const router = useRouter();

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Edit "{restaurant?.title}"
      </Heading>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Autofilled Title'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Autofilled Genre'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Autofilled Location'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Autofilled Rating'></InputField>
      </Input>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Autofilled Visited'></InputField>
      </Input>
      <Button action='positive' onPress={() => alert('Updated!')}>
        <ButtonText>Confirm</ButtonText>
      </Button>
      <Button action='negative' onPress={() => router.push(`/delete/${id}`)}>
        <ButtonText>Delete</ButtonText>
      </Button>
      <Button action='primary' onPress={() => router.back()}>
        <ButtonText>Cancel</ButtonText>
      </Button>
    </Box>
  );
}

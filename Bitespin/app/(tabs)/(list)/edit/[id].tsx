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
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';

export default function EditItemScreen() {
  const { id } = useLocalSearchParams();
  const { restaurants } = useRestaurantContext();
  const restaurant = restaurants.find((item) => item.id === id)
  const router = useRouter();

  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">
        Edit "{restaurant?.title}"
      </Heading>
      <Divider className='my-2 bg-black'></Divider>
        {/* Title Field */}
      <Text className='ml-2' bold={true}>Title:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Title'>{restaurant?.title}</InputField>
      </Input>
        {/* Genre Field */}
      <Text className='ml-2' bold={true}>Genre:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Genre'>{restaurant?.genre}</InputField>
      </Input>
        {/* Address Field */}
      <Text className='ml-2' bold={true}>Address:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Location'>{restaurant?.location}</InputField>
      </Input>
        {/* Rating Field */}
      <Text className='ml-2' bold={true}>Rating:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Rating'>{restaurant?.rating}</InputField>
      </Input>
        {/* Visited Field */}
      <Checkbox value={''} size='lg' defaultIsChecked={restaurant?.visited}>
        <CheckboxLabel className='ml-2 font-bold'>Visited:</CheckboxLabel>
        <CheckboxIndicator>
          <CheckboxIcon as={CheckIcon}/>
        </CheckboxIndicator>
      </Checkbox>
        {/* Buttons */}
      <Box className='flex-1 m-4'>
        <Button className='mb-4' action='positive' onPress={() => alert('Updated!')}>
          <ButtonText>Confirm</ButtonText>
        </Button>
        <Button className='mb-4' action='negative' onPress={() => router.push(`/delete/${id}`)}>
          <ButtonText>Delete</ButtonText>
        </Button>
        <Button className='mb-4' action='primary' onPress={() => router.back()}>
          <ButtonText>Cancel</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}

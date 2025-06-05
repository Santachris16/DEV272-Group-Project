import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';

export default function AddItemScreen() {
  return (
    <Box>
      <Heading size="3xl" className="self-center p-2">Add Restaurant</Heading>
      <Divider className='my-2 bg-black'></Divider>
      <Text className='ml-2' bold={true}>Title:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Title'></InputField>
      </Input>
      <Text className='ml-2' bold={true}>Genre:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Genre'></InputField>
      </Input>
      <Text className='ml-2' bold={true}>Address:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Address'></InputField>
      </Input>
      <Text className='ml-2' bold={true}>Rating:</Text>
      <Input variant="outline" size="lg" className="m-2 bg-white">
        <InputField placeholder='Rating'></InputField>
      </Input>
      <Checkbox value={''} size='lg' defaultIsChecked={false}>
        <CheckboxLabel className='ml-2 font-bold'>Visited:</CheckboxLabel>
        <CheckboxIndicator>
          <CheckboxIcon as={CheckIcon}/>
        </CheckboxIndicator>
      </Checkbox>
      <Box className='flex-1 m-4'>
        <Button className='mb-4' action='positive' onPress={() => alert('Added!')}>
          <ButtonText>Confirm</ButtonText>
        </Button>
        <Button action='negative' onPress={() => router.back()}>
          <ButtonText>Cancel</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}

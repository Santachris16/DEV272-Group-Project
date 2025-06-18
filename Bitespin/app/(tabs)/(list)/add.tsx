import React from 'react';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import * as Yup from "yup";
import { Formik } from "formik";
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';

const ResturantSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  genre: Yup.string().required('Genre is required'),
  location: Yup.string().required('Address is required'),
  photo: Yup.string(),
  rating: Yup.number().min(0, 'Must be between 0 - 5').max(5, 'Must be between 0 - 5'),
  visited: Yup.boolean(),
  favorite: Yup.boolean(),
});

export default function AddItemScreen() {
  const navigation = useNavigation();
  // const { id = '' } = useLocalSearchParams<{ id: string }>();
  const { addRestaurant } = useRestaurantContext();


  return (
    <Box>
      <Formik
        initialValues={{
          title: '',
          genre: '',
          location: '',
          photo: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
          rating: 0,
          visited: false,
          favorite: false,
        }}
        validationSchema={ResturantSchema}
        onSubmit={(values, { resetForm }) => {
          addRestaurant({
            title: values.title,
            genre: values.genre,
            location: values.location,
            photo: values.photo,
            rating: values.rating,
            visited: values.visited,
            favorite: values.favorite,
          });
          resetForm();
          navigation.goBack();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Box>
            <Heading size="3xl" className="self-center p-2">Add Restaurant</Heading>
            <Divider className='my-2 bg-black'></Divider>
            {/* Title Input */}
            <Text className='ml-2' bold={true}>Title:</Text>
            <Input variant="outline" size="lg" className="m-2 bg-white">
              <InputField 
                placeholder='Title'
                onChangeText={handleChange('title')}
                onBlur={handleBlur("title")}
                value={values.title}
              />
            </Input>
            {touched.title && errors.title && (
              <Text size="sm" className="text-red-500 ml-2">
                {errors.title}
              </Text>
            )}
            {/* Genre Input */}
            <Text className='ml-2' bold={true}>Genre:</Text>
            <Input variant="outline" size="lg" className="m-2 bg-white">
              <InputField 
                placeholder='Genre'
                onChangeText={handleChange('genre')}
                onBlur={handleBlur("genre")}
                value={values.genre}
              />
            </Input>
              {touched.genre && errors.genre && (
                <Text size="sm" className="text-red-500 ml-2">
                  {errors.genre}
                </Text>
              )}
            {/* Address Input */}
            <Text className='ml-2' bold={true}>Address:</Text>
            <Input variant="outline" size="lg" className="m-2 bg-white">
              <InputField 
                placeholder='Address'
                onChangeText={handleChange('location')}
                onBlur={handleBlur("location")}
                value={values.location}
              />
            </Input>
            {touched.location && errors.location && (
              <Text size="sm" className="text-red-500 ml-2">
                {errors.location}
              </Text>
            )}
            {/* Photo Input */}
            <Text className='ml-2' bold={true}>Photo:</Text>
            <Input variant="outline" size="lg" className="m-2 bg-white">
              <InputField 
                placeholder='Photo URL'
                onChangeText={handleChange('photo')}
                onBlur={handleBlur("photo")}
                value={values.photo}
              />
            </Input>
            {touched.photo && errors.photo && (
              <Text size="sm" className="text-red-500 ml-2">
                {errors.photo}
              </Text>
            )}
            {/* Rating Input */}
            <Text className='ml-2' bold={true}>Rating:</Text>
            <Input variant="outline" size="lg" className="m-2 bg-white">
              <InputField 
                placeholder='Rating'
                onChangeText={handleChange('rating')}
                onBlur={handleBlur("rating")}
                value={values.rating.toString()}
              />
            </Input>
            {touched.rating && errors.rating && (
              <Text size="sm" className="text-red-500 ml-2">
                {errors.rating}
              </Text>
            )}
            {/* Visited Input */}
            <Checkbox 
              size='lg'
              value='visited' 
              isChecked={values.visited}
              onChange={(isChecked) => setFieldValue('visited', isChecked)}
              aria-label="Mark as visited"
            >
              <CheckboxLabel className='ml-2 font-bold'>Visited:</CheckboxLabel>
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon}/>
              </CheckboxIndicator>
            </Checkbox>
            {touched.visited && errors.visited && (
              <Text size="sm" className="text-red-500 mt-1">
                {errors.visited}
              </Text>
            )}
            {/* Favorite Input */}
            <Checkbox 
              size='lg'
              value='favorite' 
              isChecked={values.favorite}
              onChange={(isChecked) => setFieldValue('favorite', isChecked)}
              aria-label="Mark as favorite"
            >
              <CheckboxLabel className='ml-2 font-bold'>Favorite:</CheckboxLabel>
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon}/>
              </CheckboxIndicator>
            </Checkbox>
            {touched.favorite && errors.favorite && (
              <Text size="sm" className="text-red-500 mt-1">
                {errors.favorite}
              </Text>
            )}
            {/* Buttons */}
            <Box className='flex-1 m-4'>
              <Button className='mb-4' action='positive' onPress={() => handleSubmit()}>
                <ButtonText>Confirm</ButtonText>
              </Button>
              <Button action='negative' onPress={() => router.back()}>
                <ButtonText>Cancel</ButtonText>
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

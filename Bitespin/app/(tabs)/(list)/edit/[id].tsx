import React from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Divider } from '@/components/ui/divider';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';
import * as Yup from "yup";
import { Formik } from "formik";

export default function EditItemScreen() {
  const { id } = useLocalSearchParams();
  const { restaurants, updateRestaurant } = useRestaurantContext();
  const restaurant = restaurants.find((item) => item.id === id);
  const router = useRouter();
  const navigation = useNavigation();

  const ResturantSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    genre: Yup.string().required('Genre is required'),
    location: Yup.string().required('Address is required'),
    photo: Yup.string(),
    rating: Yup.number().min(0, 'Must be between 0 - 5').max(5, 'Must be between 0 - 5'),
    visited: Yup.boolean(),
    favorite: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={{
        title: restaurant?.title,
        genre: restaurant?.genre,
        location: restaurant?.location,
        photo: restaurant?.photo,
        rating: restaurant?.rating,
        visited: restaurant?.visited,
        favorite: restaurant?.favorite,
      }}
        validationSchema={ResturantSchema}
        onSubmit={(values, { resetForm }) => {
          updateRestaurant(id, {
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
            <Heading size="3xl" className="self-center p-2">
              Edit "{restaurant?.title}"
            </Heading>
            <Divider className='my-2 bg-black'></Divider>
              {/* Title Field */}
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
              {/* Genre Field */}
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
              {/* Address Field */}
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
              {/* Photo Field */}
            <Text className='ml-2' bold={true}>Photo:</Text>
            <Input variant="outline" size="lg" className="m-2 bg-white">
              <InputField 
                placeholder='Photo'
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
              {/* Rating Field */}
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
              {/* Visited Field */}
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
              {/* Favorite Field */}
            <Checkbox 
              size='lg'
              value='favorite' 
              isChecked={values.favorite}
              onChange={(isChecked) => setFieldValue('favorite', isChecked)}
              aria-label="Mark as favorite"
            >
              <CheckboxLabel className='ml-2 font-bold'>Favorited:</CheckboxLabel>
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon}/>
              </CheckboxIndicator>
            </Checkbox>
              {/* Buttons */}
            <Box className='flex-1 m-4'>
              <Button className='mb-4' action='positive' onPress={() => handleSubmit()}>
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
        )}
    </Formik>
  );
}

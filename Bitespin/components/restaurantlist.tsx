import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Restaurant } from '../data/restaurants';
import { supabase } from '../data/supabase';

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

 useEffect(() => {
  const fetchRestaurants = async () => {
    const { data, error } = await supabase
      .from('Restaurant') 
      .select('*')

    if (error) {
      console.error('Supabase error:', error.message)
    } else {
      setRestaurants(data || [])
    }
  }

  fetchRestaurants()
}, [])

  const renderItem = ({ item }: { item: Restaurant }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.names}</Text>
      <Text>Cuisine: {item.cuisine}</Text>
      <Text>Rating: {item.ratings}</Text>
      <Text>Price for One: ${item.price}</Text>
    </View>
  )

  return (
    <FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.names}-${index}`}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default RestaurantList

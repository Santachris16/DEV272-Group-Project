/// <reference types="jest" />
import React from 'react';
import { render } from '@testing-library/react-native';
import FavoritesScreen from '../../app/(tabs)/(favorites)/favorites';
import { Restaurant } from '@/components/ui/restaurant-context-provider'; 


jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockToggleFavorite = jest.fn();
jest.mock('@/components/ui/restaurant-context-provider', () => ({ // Use alias
  __esModule: true,
  useRestaurantContext: () => ({
    toggleFavorite: mockToggleFavorite,
    restaurants: [
      { id: '1', title: 'Sushi Spot', genre: 'Japanese', rating: 4.5, favorite: true },
      { id: '2', title: 'Burger Joint', genre: 'American', rating: 3.9, favorite: false },
      { id: '3', title: 'Taco Heaven', genre: 'Mexican', rating: 4.2, favorite: true },
    ],
  }),
}));

// Fix for "ReferenceError: Text" (import Text inside the mock)
jest.mock('@/components/RestaurantCard', () => { // Use alias
  const { Text } = jest.requireActual('react-native'); // Import Text here
  return {
    __esModule: true,
    default: jest.fn(({ title }) => <Text>{title}</Text>),
  };
});

// No longer need this global import here, as it's now inside the mock where it's used.
// import { Text } from 'react-native';

describe('FavoritesScreen', () => {
  beforeEach(() => {
    mockToggleFavorite.mockClear();
    // Correctly reference the mocked RestaurantCard default export for clearing
    (jest.requireMock('@/components/RestaurantCard').default as jest.Mock).mockClear();
  });

  it('renders the Favorites List heading', () => {
    const { getByText } = render(<FavoritesScreen />);
    expect(getByText('Favorites List')).toBeTruthy();
  });

  it('renders only favorite restaurants', () => {
    const { getByText, queryByText } = render(<FavoritesScreen />);

    expect(getByText('Sushi Spot')).toBeTruthy();
    expect(getByText('Taco Heaven')).toBeTruthy();
    expect(queryByText('Burger Joint')).toBeNull();
  });
});
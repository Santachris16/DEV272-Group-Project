import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LogoutButton from '../../components/LogoutButton'; // Adjust path if LogoutButton is not in components/
import { supabase } from '@/data/supabase';

// NEW: We need to mock expo-router's context provider if it exists, or just wrap
// the component in a simple mock wrapper that satisfies useRouter.
// expo-router doesn't export a direct context like NavigationContainer,
// but the key is that useRouter needs to be within a "Router" context.
// When you mock useRouter, you often don't *need* the full wrapper, but
// sometimes internal Expo Router components might still try to access a context
// that isn't there, leading to the "outside of scope" error.
// Let's stick with the simple useRouter mock as it's usually sufficient,
// but be aware that if problems persist, it might be related to more complex
// internal setup of expo-router that the test environment lacks.

// Mock the useRouter hook
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  // We're mocking the entire module, so when `useRouter` is called from it,
  // it will return our mocked object.
  useRouter: () => ({
    replace: mockReplace,
    // Add other router methods if LogoutButton or its parents implicitly use them
    // For example, if a parent component used `router.back()`, you'd add:
    // back: jest.fn(),
  }),
  // If expo-router exports other things that might be used, mock them as well.
  // For simplicity, we only mock what's directly used by LogoutButton.
}));

// Mock the supabase client
jest.mock('@/data/supabase', () => ({
  supabase: {
    auth: {
      signOut: jest.fn(), // Mock the signOut method
    },
  },
}));

describe('LogoutButton', () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure isolation
    jest.clearAllMocks();
    // Ensure signOut mock returns a resolved promise by default
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
  });

  it('renders correctly', () => {
    const { getByText } = render(<LogoutButton />);
    expect(getByText('Log Out')).toBeTruthy();
  });

  it('calls supabase.auth.signOut and redirects to /login on press', async () => {
    const { getByText } = render(<LogoutButton />);
    const logoutButton = getByText('Log Out');

    fireEvent.press(logoutButton);

    // Wait for the async signOut operation to complete
    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    });

    // Then assert the navigation
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/login');
  });

  // Test to ensure it still attempts redirect even if signOut fails (based on current implementation)
  it('attempts redirect to /login even if signOut fails', async () => {
    const { getByText } = render(<LogoutButton />);
    const logoutButton = getByText('Log Out');

    const mockError = new Error('Sign out failed');
    (supabase.auth.signOut as jest.Mock).mockResolvedValueOnce({ error: mockError });

    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    });

    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/login');
  });
});
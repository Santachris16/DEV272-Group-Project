import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { RestaurantProvider } from '@/components/ui/restaurant-context-provider';

// Import Tanstack query provider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import UserProvider to provide user data throughout the app
import { UserProvider } from '@/context/UserContext';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Create Tanstack Query client
  const queryClient = new QueryClient();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <GluestackUIProvider mode="light">
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RestaurantProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </RestaurantProvider>
          </ThemeProvider>
        </GluestackUIProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

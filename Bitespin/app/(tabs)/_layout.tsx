import { Tabs, Redirect, usePathname } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { useUser } from '@/context/UserContext';    // Import user context to check if user is logged in

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { user, isPending } = useUser();            // Get user data and loading state from context

  const pathname = usePathname();

  // TODO: Handle loading state
  
  // ====== Logic to redirect user based on login status ========
  //
  // If not logged in and trying to access a protected tab, redirect to login
  const isOnLoginTab = pathname === '/login';
  const isTryingToAccessProtectedTab = !user && !isOnLoginTab;
  if (isTryingToAccessProtectedTab) {
    return <Redirect href="/login" />;
  }

  // Logged in -> render protected tabs
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(list)"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.dash" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(favorites)"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.right" color={color} />,
        }}
      />
    </Tabs>
  );
}

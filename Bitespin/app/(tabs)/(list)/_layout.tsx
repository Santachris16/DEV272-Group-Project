import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="list" options={{ title: "List" }} />
      <Stack.Screen name="details/[id]" options={{ title: "Details" }} />
    </Stack>
  );
}

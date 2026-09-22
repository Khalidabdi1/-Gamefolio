import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";
import { LibraryProvider, useLibrary } from "@/state/library";
const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#ff624f",
    background: "#0c0a0b",
    card: "#1c191a",
    text: "#f5f4f0",
    border: "#302b2e",
  },
};
function Navigation() {
  const { ready, error } = useLibrary();
  if (!ready)
    return (
      <View className="flex-1 items-center justify-center bg-canvas">
        <ActivityIndicator color="#ff624f" />
      </View>
    );
  return (
    <>
      <StatusBar style="light" />
      {error && (
        <View className="bg-surface px-5 py-4">
          <Text accessibilityRole="alert" className="text-coral">
            {error}
          </Text>
        </View>
      )}
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#0c0a0b" },
          headerTintColor: "#f5f4f0",
          headerStyle: { backgroundColor: "#0c0a0b" },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="game/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="progress/[id]"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen name="stats" options={{ title: "Stats" }} />
        <Stack.Screen
          name="calendar"
          options={{ title: "Release calendar", presentation: "modal" }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Your profile",
            presentation: "formSheet",
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.75, 1],
          }}
        />
      </Stack>
    </>
  );
}
export default function Root() {
  return (
    <ThemeProvider value={theme}>
      <LibraryProvider>
        <Navigation />
      </LibraryProvider>
    </ThemeProvider>
  );
}

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
// app/_layout.tsx
// app/_layout.tsx
// app/_layout.tsx
// import { Slot, useRouter } from 'expo-router';
// import { useEffect } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import useAuth from '../hooks/useAuth';

// export default function RootLayout() {
//   const { user, loading } = useAuth(); // ✅ Make sure both are destructured
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (user === null) {
//         router.replace('./auth/signin');
//       } else {
//         router.replace('./tabs');
//       }
//     }
//   }, [user, loading]);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#ff66b3" />
//       </View>
//     );
//   }

//   return <Slot />; // ✅ Must render <Slot /> to avoid the "navigate before mounting" error
// }
// import { Slot, useRouter } from 'expo-router';
// import { useEffect } from 'react';
// import { ActivityIndicator, View } from 'react-native';
// import useAuth from '../hooks/useAuth';

// export default function RootLayout() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       if (user === null) {
//         // 👇 redirect to onboarding welcome screen if not logged in
//         router.replace('/onboarding/welcome');
//       } else {
//         router.replace('./tabs');
//       }
//     }
//   }, [user, loading]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" color="#ff66b3" />
//     </View>
//   );
// }
// import { Slot, useRouter } from 'expo-router';
// import { useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';

// export default function RootLayout() {
//   const router = useRouter();

//   // Simulated auth check (replace with Firebase or real logic)
//   const user = null; // or fetched from async storage / context
//   const loading = false;

//   useEffect(() => {
//     if (!loading) {
//       if (!user) {
//         router.replace('/onboarding/welcome');
//       } else {
//         router.replace('./tabs');
//       }
//     }
//   }, [loading]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" />
//     </View>
//   );
//   return <Slot/>;
// }
// // app/_layout.tsx
// import { Slot, useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, View } from 'react-native';

// export default function RootLayout() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState<null | object>(null); // simulate logged-in or not

//   useEffect(() => {
//     // simulate async auth check
//     setTimeout(() => {
//       const isLoggedIn = false; // change to `true` to simulate logged in
//       setUser(isLoggedIn ? { id: '123' } : null);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       if (user === null) {
//         router.replace('./onboarding/welcome');
//       } else {
//         router.replace('./tabs');
//       }
//     }
//   }, [loading, user]);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#ff66b3" />
//       </View>
//     );
//   }

//   return <Slot />;
// }

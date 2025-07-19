// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#ff66b3',
//         tabBarLabelStyle: { fontWeight: '600' },
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }: { color: string; size: number }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarIcon: ({ color, size }: { color: string; size: number }) => (
//             <Ionicons name="cart" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }: { color: string; size: number }) => (
//             <Ionicons name="person" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
// app/(tabs)/_layout.tsx
// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#ff66b3',
//         tabBarLabelStyle: { fontWeight: '600' },
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }: { color: string; size: number }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'Cart',
//           tabBarIcon: ({ color, size }: { color: string; size: number }) => (
//             <Ionicons name="cart" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }: { color: string; size: number }) => (
//             <Ionicons name="person" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="products"
//         options={{
//           title: 'Products',
//           tabBarIcon: ({ color, size }: { color: string; size: number }) => (
//             <Ionicons name="shirt" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff66b3',
        tabBarLabelStyle: { fontWeight: '600' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="shirt" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}


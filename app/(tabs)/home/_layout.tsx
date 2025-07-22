import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const tabScreens = [
  {
    name: "home", // lowercase to match folder/file
    title: "Home",
    icon: "home",
  },
  {
    name: "products",
    title: "Products",
    icon: "pricetags",
  },
  {
    name: "wishlist",
    title: "Wishlist",
    icon: "heart",
  },
  {
    name: "cart",
    title: "Cart",
    icon: "cart",
  },
  {
    name: "settings",
    title: "Settings",
    icon: "settings",
  },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff66b3",
        tabBarLabelStyle: { fontWeight: "600" },
        headerShown: false,
      }}
    >
      {tabScreens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name={icon as any} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

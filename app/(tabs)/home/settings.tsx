import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SettingsScreen = () => {
  const router = useRouter();

  const LogOut = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/signin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.replace("/(tabs)/profile")}
      >
        <Ionicons name="person-outline" size={20} color="#333" />
        <Text style={styles.optionText}>My Accounts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/home/wishlist")}
      >
        <Ionicons name="heart-outline" size={20} color="#333" />
        <Text style={styles.optionText}>Wishlist</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("/shop/orders")}
      >
        <Ionicons name="cart-outline" size={20} color="#333" />
        <Text style={styles.optionText}>My Orders</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.option}
        onPress={() => router.push("./(tabs)/password")}
      >
        <Ionicons name="key-outline" size={20} color="#333" />
        <Text style={styles.optionText}>Passwords</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.replace("/(auth)/signin")}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#333"
          onPress={LogOut}
        />
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

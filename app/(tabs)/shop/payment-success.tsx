import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PaymentSuccessScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="#000"
          onPress={() => router.replace("/")}
        />
        <Text style={styles.headerText}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/success.png")}
          style={styles.successIcon}
        />
        <Text style={styles.successText}>Payment done successfully.</Text>
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  successText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A7F64",
  },
});

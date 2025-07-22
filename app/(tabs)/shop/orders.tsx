import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const OrdersScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="#000"
          onPress={() => router.back()}
        />
        <Text style={styles.headerText}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <View style={styles.topRow}>
          <Image
            source={require("../../../assets/images/thir.jpg")}
            style={styles.productImage}
          />
          <View style={styles.details}>
            <Text style={styles.name}>Crop Top</Text>
            <Text style={styles.label}>Variations :</Text>
            <View style={styles.variations}>
              <Text style={styles.tag}>Black</Text>
              <Text style={styles.tag}>Red</Text>
            </View>
            <Text style={styles.inStock}>In Stock</Text>
            <View style={styles.priceTag}>
              <Text style={styles.price}>₹ 800.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            Ordered on: <Text style={styles.metaValue}>10th June 2025</Text>
          </Text>
          <Text style={styles.meta}>
            Delivered on: <Text style={styles.metaValue}>19th June 2025</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#f2f9f6",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
  },
  topRow: {
    flexDirection: "row",
    gap: 12,
  },
  productImage: {
    width: 90,
    height: 110,
    borderRadius: 12,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 13,
    marginTop: 6,
  },
  variations: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#aaa",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
  },
  inStock: {
    color: "#d6336c",
    marginTop: 4,
    fontWeight: "600",
    fontSize: 13,
  },
  priceTag: {
    backgroundColor: "#e8f5ee",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
  },
  price: {
    fontWeight: "600",
    fontSize: 14,
  },
  metaRow: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 12,
    paddingTop: 8,
  },
  meta: {
    fontSize: 13,
    color: "#333",
    marginBottom: 4,
  },
  metaValue: {
    fontWeight: "600",
  },
});

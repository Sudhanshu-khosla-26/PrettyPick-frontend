import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CartScreen = () => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    const item = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCartItems(item.data.items);
    console.log(item.data.items, "item in a cart");
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Cart</Text>

      {cartItems.map((item) => (
        <View key={item._id} style={styles.card}>
          <Image source={item.product.images[0]} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.product.name}</Text>
            <Text style={styles.subtitle}>{item.product.description}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Size</Text>
              <Text style={styles.value}>S</Text>

              <Text style={[styles.label, { marginLeft: 16 }]}>Qty</Text>
              <Text style={styles.value}>{item.quantity}</Text>
            </View>

            <Text style={styles.delivery}>
              Delivery by : A-56 Vishnu Garden{" "}
            </Text>
          </View>
        </View>
      ))}

      <View style={styles.couponSection}>
        <Ionicons name="pricetags" size={20} />
        <Text style={styles.couponLabel}>Apply Coupons</Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectText}>Select</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.sectionTitle}>Order Payment Details</Text>

        <View style={styles.summaryRow}>
          <Text>Order Amount</Text>
          <Text>₹ {total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Convenience</Text>
          <Text style={styles.linkText}>Know More</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Delivery Fee</Text>
          <Text style={{ color: "green" }}>Free</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Order Total</Text>
          <Text style={styles.totalValue}>₹ {total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  delivery: {
    fontSize: 12,
    color: "#777",
  },
  couponSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  couponLabel: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
  },
  selectText: {
    fontSize: 13,
    color: "#555",
  },
  summary: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 14,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalRow: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  payButton: {
    backgroundColor: "#ff69b4",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#e91e63",
  },
});

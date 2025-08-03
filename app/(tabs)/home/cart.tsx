"use client";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
  quantity: number;
}

const CartScreen = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getCartItems = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      const token = userString ? JSON.parse(userString).token : null;

      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.items);
      console.log(response.data.items, "item in a cart");
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const deliveryFee = 30; // Fixed delivery fee
  const total = subtotal + deliveryFee;

  const handleProceedToCheckout = async () => {
    // Save cart data and totals to AsyncStorage for checkout page
    const checkoutData = {
      cartItems,
      subtotal,
      deliveryFee,
      total,
      timestamp: Date.now(),
    };

    try {
      await AsyncStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      router.push("/shop/checkout");
    } catch (error) {
      console.error("Error saving checkout data:", error);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading cart...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          {cartItems.map((item) => (
            <View key={item._id} style={styles.card}>
              <Image
                source={{ uri: item.product.images[0] }}
                style={styles.image}
              />
              <View style={styles.details}>
                <Text style={styles.title}>{item.product.name}</Text>
                <Text style={styles.subtitle}>{item.product.description}</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Size</Text>
                  <Text style={styles.value}>S</Text>
                  <Text style={[styles.label, { marginLeft: 16 }]}>Qty</Text>
                  <Text style={styles.value}>{item.quantity}</Text>
                </View>
                <Text style={styles.price}>
                  ₹ {item.product.price.toFixed(2)}
                </Text>
                <Text style={styles.delivery}>
                  Delivery by : A-56 Vishnu Garden
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
              <Text>₹ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Convenience</Text>
              <Text style={styles.linkText}>Know More</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Delivery Fee</Text>
              <Text>₹ {deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Order Total</Text>
              <Text style={styles.totalValue}>₹ {total.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            onPress={handleProceedToCheckout}
          >
            <Text style={styles.payText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 40,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666",
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
    marginTop: 2,
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
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff69b4",
    marginTop: 4,
  },
  delivery: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
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
    color: "#ff69b4",
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

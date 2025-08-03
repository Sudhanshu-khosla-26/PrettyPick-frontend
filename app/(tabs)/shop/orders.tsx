import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const OrdersScreen = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const token = user ? JSON.parse(user).token : null;

        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        setOrders(res.data as any);
      } catch (err) {
        // handle error as needed
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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

      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        // Sort orders by totalAmount (small to big)
        [...orders]
          .sort((a, b) => (a.totalAmount || 0) - (b.totalAmount || 0))
          .map((order, idx) => {
            const itemsToShow = showAll
              ? order.items
              : order.items?.slice(0, 1);

            return (
              <View style={styles.card} key={order._id || idx}>
                <Text style={styles.name}>
                  Order #{order._id?.slice(-6) || idx + 1}
                </Text>
                <Text style={styles.meta}>
                  Status: <Text style={styles.metaValue}>{order.status}</Text>
                </Text>
                <Text style={styles.meta}>
                  Placed on:{" "}
                  <Text style={styles.metaValue}>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "-"}
                  </Text>
                </Text>
                <Text style={styles.meta}>
                  Total:{" "}
                  <Text style={styles.metaValue}>
                    ₹ {order.totalAmount?.toFixed(2) || "0.00"}
                  </Text>
                </Text>
                <Text style={styles.meta}>
                  Delivery Address:{" "}
                  <Text style={styles.metaValue}>
                    {order.deliveryAddress
                      ? `${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} - ${order.deliveryAddress.pincode}`
                      : "-"}
                  </Text>
                </Text>
                <View style={{ marginTop: 10 }}>
                  {(itemsToShow || []).map((item: any, i: number) => (
                    <View
                      style={[styles.topRow, { marginBottom: 8 }]}
                      key={item._id || i}
                    >
                      <Image
                        source={
                          item.product?.images?.[0]
                            ? { uri: item.product.images[0] }
                            : require("../../../assets/images/thir.jpg")
                        }
                        style={styles.productImage}
                      />
                      <View style={styles.details}>
                        <Text style={styles.name}>
                          {item.product?.name || "Product Name"}
                        </Text>
                        <Text style={styles.label}>Qty: {item.quantity}</Text>
                        <Text style={styles.label}>
                          Price: ₹ {item.product?.price?.toFixed(2) || "0.00"}
                        </Text>
                        <Text style={styles.label}>
                          In Stock: {item.product?.stock ?? "-"}
                        </Text>
                      </View>
                    </View>
                  ))}
                  {order.items && order.items.length > 1 && (
                    <Text
                      style={{
                        color: "#007b83",
                        marginTop: 4,
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                      onPress={() => setShowAll((prev) => !prev)}
                    >
                      {showAll
                        ? "Show less"
                        : `Read more (${order.items.length - 1} more)`}
                    </Text>
                  )}
                </View>
              </View>
            );
          })
      )}
    </ScrollView>
  );
};

export default OrdersScreen;

// ...styles remain unchanged
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

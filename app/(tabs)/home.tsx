import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const categories = [
  { id: 1, name: "Tops", icon: "shirt-outline" },
  { id: 2, name: "Dresses", icon: "accessibility-outline" }, // changed from invalid
  { id: 3, name: "Kurtis", icon: "rose-outline" }, // changed from invalid
  { id: 4, name: "Hoodies", icon: "cloudy-outline" }, // changed from invalid
];

const Home = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getAllProducts = async () => {
    const products = await axios.get("http://localhost:5000/api/products");
    console.log(products, "products");
    setFeatured(products.data);
  };

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    getAllProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Welcome to Pretty Pick 💖</Text>

      {/* Hero */}
      <Animated.View style={[styles.banner, { opacity: fadeAnim }]}>
        <Image
          source={require("../../assets/images/fash.jpg")}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>New Arrivals</Text>
          <Text style={styles.bannerSubtitle}>Trendy styles for you</Text>
        </View>
      </Animated.View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Shop by Category</Text>
      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.catCard}>
            <Ionicons name={cat.icon as any} size={28} color="#ff69b4" />
            <Text style={styles.catText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Featured */}
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {featured.length > 0 &&
          featured.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.productCard}
              onPress={() => router.push(`./shop/${item?._id!}`)}
            >
              <Image source={item.images[0]!} style={styles.productImage} />
              <Text style={styles.productName}>{item.name!}</Text>
              <Text style={styles.productPrice}>₹{item.price!}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#ff69b4",
  },
  banner: {
    position: "relative",
    height: 200,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 10,
    left: 16,
  },
  bannerTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#ffe4e1",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 16,
    marginBottom: 10,
    color: "#333",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  catCard: {
    alignItems: "center",
    backgroundColor: "#fce4ec",
    padding: 10,
    borderRadius: 10,
    width: 80,
  },
  catText: {
    fontSize: 12,
    marginTop: 6,
    color: "#333",
  },
  productCard: {
    width: width * 0.4,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    alignItems: "center",
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 13,
    color: "#888",
  },
});

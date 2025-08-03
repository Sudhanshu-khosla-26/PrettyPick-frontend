import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const sizes = ["S", "M", "L", "XL", "XXL"];

const ProductDetailScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("M");
  const [itemDetails, setItemDetails] = useState();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    const products = await axios.get(`http://localhost:5000/api/products`);
    const item = products.data.find((item: any) => item._id === params.id);
    const similaritem = products.data.filter(
      (item: any) => item._id !== params.id
    );
    console.log(item, "item");
    console.log(similaritem, "similaritem");
    setItemDetails(item);
    setSimilarProducts(similaritem);
    setLoading(false);
  };

  const handleAddToCart = async () => {
    let unjsondata = await AsyncStorage.getItem("user")!;
    const jsondata = JSON.parse(unjsondata as any);
    const token = jsondata.token;
    const item = await axios.post(
      "http://localhost:5000/api/cart",
      {
        product: params.id,
        quantity: 1,
        size: selectedSize,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(item, "item added to cart");
  };

  useEffect(() => {
    getAllProducts();
  }, [params.id]);

  if (loading || !itemDetails) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>{itemDetails.name!}</Text>
        <Ionicons
          name="cart-outline"
          onPress={() => router.replace("/shop/cart")}
          size={24}
        />
      </View>

      {/* Product Image */}
      <Image source={itemDetails.images[0]!} style={styles.productImage} />

      {/* Size Selection */}
      <Text style={styles.sizeLabel}>Size: {selectedSize}</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.sizeButtonSelected,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={
                selectedSize === size
                  ? styles.sizeTextSelected
                  : styles.sizeText
              }
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product Info */}
      <Text style={styles.name}>{itemDetails.name!}</Text>
      <Text style={styles.priceRow}>
        <Text style={styles.strike}>₹500</Text>{" "}
        <Text style={styles.discounted}>₹{itemDetails.price!}</Text>{" "}
        <Text style={styles.discountText}>30%</Text>
      </Text>

      <Text style={styles.sectionTitle}>Product Details</Text>
      <Text style={styles.description}>{itemDetails.description!}</Text>

      <Text style={styles.stock}>
        {itemDetails.isAvailable! ? "In Stock" : "Out of Stock"}
      </Text>

      {/* Action Buttons */}
      <TouchableOpacity onPress={handleAddToCart} style={styles.cartButton}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>

      {/* Similar Section */}
      <View style={styles.optionsRow}>
        <Text style={styles.optionText}>View Similar</Text>
        <Text style={styles.optionText}>Add to Compare</Text>
      </View>

      <Text style={styles.sectionTitle}>Similar To</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={similarProducts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            style={styles.productCard}
            onPress={() => router.replace(`/shop/${item?._id}`)}
          >
            <View style={styles.similarCard}>
              <Image source={item.images[0]} style={styles.similarImage} />
              <Text style={styles.similarName}>{item.name}</Text>
              <Text style={styles.similarPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  productImage: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    resizeMode: "contain",
    marginBottom: 10,
  },
  sizeLabel: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  sizeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ff69b4",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sizeButtonSelected: {
    backgroundColor: "#ff69b4",
    borderColor: "#ff69b4",
  },
  sizeText: {
    fontSize: 13,
    color: "#000",
  },
  sizeTextSelected: {
    color: "#fff",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 8,
  },
  priceRow: {
    fontSize: 14,
    marginBottom: 10,
  },
  strike: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  discounted: {
    fontWeight: "600",
    fontSize: 15,
    color: "#000",
  },
  discountText: {
    color: "#d6336c",
    fontWeight: "600",
    fontSize: 13,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginTop: 14,
    marginBottom: 4,
  },
  description: {
    color: "#555",
    fontSize: 13,
    marginBottom: 10,
  },
  stock: {
    color: "#d6336c",
    fontWeight: "600",
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: "#ff69b4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: "#ff69b4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  similarCard: {
    marginRight: 14,
    width: 120,
  },
  similarImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 6,
  },
  similarName: {
    fontSize: 13,
    fontWeight: "600",
  },
  similarPrice: {
    fontSize: 12,
    color: "#444",
  },
});

"use client";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categories = ["All", "Tops", "Kurtis", "Dresses"];

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  images?: string[];
}

const ProductList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [addingToWishlist, setAddingToWishlist] = useState<string | null>(null);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    try {
      const wishlist = await AsyncStorage.getItem("wishlist");
      if (wishlist) {
        setWishlistItems(JSON.parse(wishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  const handleAddToCart = async (item: Product) => {
    const userString = await AsyncStorage.getItem("user");
    const token = userString ? JSON.parse(userString).token : null;

    if (!token) {
      Alert.alert("Login Required", "Please login to add items to cart");
      return;
    }

    try {
      setAddingToCart(item._id);
      await axios.post(
        "http://localhost:5000/api/cart",
        {
          product: item._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Item added to cart successfully!", [
        { text: "OK", style: "default" },
      ]);
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add item to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  const handleToggleWishlist = async (item: Product) => {
    const userString = await AsyncStorage.getItem("user");
    const token = userString ? JSON.parse(userString).token : null;

    if (!token) {
      Alert.alert("Login Required", "Please login to add items to wishlist");
      return;
    }

    try {
      setAddingToWishlist(item._id);
      const isInWishlist = wishlistItems.includes(item._id);

      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(
          "http://localhost:5000/api/wishlist" + `/${item._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedWishlist = wishlistItems.filter((id) => id !== item._id);
        await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlistItems(updatedWishlist);
        Alert.alert("Removed", "Item removed from wishlist");
      } else {
        await axios.post(
          "http://localhost:5000/api/wishlist" + `/${item._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedWishlist = [...wishlistItems, item._id];
        await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setWishlistItems(updatedWishlist);
        Alert.alert("Added", "Item added to wishlist!");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      Alert.alert("Error", "Failed to update wishlist");
    } finally {
      setAddingToWishlist(null);
    }
  };

  useEffect(() => {
    getAllProducts();
    loadWishlist();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const LoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#ff69b4" />
      <Text style={styles.loadingText}>Loading amazing products...</Text>
      <View style={styles.loadingDots}>
        <View style={[styles.dot, styles.dot1]} />
        <View style={[styles.dot, styles.dot2]} />
        <View style={[styles.dot, styles.dot3]} />
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: Product }) => {
    const isInWishlist = wishlistItems.includes(item._id);
    const isAddingToCart = addingToCart === item._id;
    const isAddingToWishlist = addingToWishlist === item._id;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.replace(`/shop/${item._id}`)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image || item.images?.[0] }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => handleToggleWishlist(item)}
            disabled={isAddingToWishlist}
          >
            {isAddingToWishlist ? (
              <ActivityIndicator size="small" color="#ff69b4" />
            ) : (
              <Ionicons
                name={isInWishlist ? "heart" : "heart-outline"}
                size={20}
                color={isInWishlist ? "#ff69b4" : "#666"}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.addBtn, isAddingToCart && styles.disabledBtn]}
              onPress={() => handleAddToCart(item)}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons name="cart-outline" size={16} color="#fff" />
                  <Text style={styles.addText}>Add to Cart</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>🛍️ Explore Products</Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.categories}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={
                selectedCategory === cat
                  ? styles.activeCategoryText
                  : styles.categoryText
              }
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  wishlistHeaderBtn: {
    position: "relative",
    padding: 8,
  },
  wishlistBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#ff69b4",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  wishlistBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  search: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
    marginBottom: 12,
    fontSize: 16,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: "#ff69b4",
  },
  categoryText: {
    color: "#333",
    fontSize: 14,
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fdfdfd",
    borderRadius: 16,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  wishlistBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
    minHeight: 36,
  },
  price: {
    fontSize: 16,
    color: "#ff69b4",
    fontWeight: "700",
    marginBottom: 8,
  },
  actionButtons: {
    width: "100%",
  },
  addBtn: {
    backgroundColor: "#ff69b4",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  disabledBtn: {
    backgroundColor: "#ccc",
  },
  addText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  loadingDots: {
    flexDirection: "row",
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff69b4",
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
});

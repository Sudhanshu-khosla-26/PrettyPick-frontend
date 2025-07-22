import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

const ProductList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null); // Changed to track specific item ID

  const token = JSON.parse(localStorage.getItem("user") || "{}").token;

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

  const handleAddToCart = async (item) => {
    if (!token) {
      Alert.alert("Login Required", "Please login to add items to cart");
      return;
    }

    try {
      setAddingToCart(item._id); // Set the specific item ID being added
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
      setAddingToCart(null); // Reset to null when done
    }
  };

  useEffect(() => {
    getAllProducts();
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.replace(`/shop/${item._id}`)}
    >
      <Image
        source={{ uri: item.image || item.images?.[0] }}
        style={styles.image}
        // defaultSource={require("../../../assets/images/placeholder.jpg")}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <TouchableOpacity
        style={[styles.addBtn, addingToCart === item._id && styles.disabledBtn]} // Check specific item ID
        onPress={() => handleAddToCart(item)}
        disabled={addingToCart === item._id} // Disable only the specific item being added
      >
        {addingToCart === item._id ? ( // Show spinner only for the specific item
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.addText}>Add to Cart</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛍️ Explore Products</Text>

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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 12,
  },
  search: {
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: "#ff69b4",
  },
  categoryText: {
    color: "#333",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fdfdfd",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  addBtn: {
    marginTop: 8,
    backgroundColor: "#ff69b4",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
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

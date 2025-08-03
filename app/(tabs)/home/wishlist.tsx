"use client";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: any;
  rating: number;
  inStock: boolean;
  brand?: string;
}

// const wishlistItems: WishlistItem[] = [
//   {
//     id: "1",
//     name: "Slim Fit Top",
//     price: 1600,
//     originalPrice: 2000,
//     image: require("../../../assets/images/fir.jpg"),
//     rating: 4.5,
//     inStock: true,
//     brand: "Fashion Co.",
//   },
//   {
//     id: "2",
//     name: "Western Top",
//     price: 1100,
//     originalPrice: 1400,
//     image: require("../../../assets/images/sec.jpg"),
//     rating: 4.2,
//     inStock: true,
//     brand: "Style Hub",
//   },
//   {
//     id: "3",
//     name: "Casual Dress",
//     price: 2200,
//     originalPrice: 2800,
//     image: require("../../../assets/images/fir.jpg"),
//     rating: 4.8,
//     inStock: false,
//     brand: "Trendy Wear",
//   },
// ];

const WishlistScreen = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const unjsondata = await AsyncStorage.getItem("user");
        if (!unjsondata) {
          Alert.alert("Error", "User not logged in.");
          setLoading(false);
          return;
        }
        const jsondata = JSON.parse(unjsondata as any);
        const token = jsondata.token;

        const response = await axios.get("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.products, "wishlist items fetched");
        // Map API data to WishlistItem[]
        const mappedItems: WishlistItem[] = response.data.products.map(
          (item: any) => ({
            id: item._id || item.id,
            name: item.name,
            price: item.price,
            originalPrice: 500,
            image: { uri: item.images[0] }, // assuming image is a URL
            rating: 4.5,
            inStock: item.stock > 0 ? true : false,
            brand: "Style Hub",
          })
        );

        setItems(mappedItems);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const moveToCart = async (item: WishlistItem) => {
    if (!item.inStock) return;
    try {
      // Get user token from AsyncStorage
      const unjsondata = await AsyncStorage.getItem("user");
      if (!unjsondata) {
        Alert.alert("Error", "User not logged in.");
        return;
      }
      const jsondata = JSON.parse(unjsondata as any);
      const token = jsondata.token;

      // You may want to handle size selection; using "M" as default for now
      const selectedSize = "M";

      // Send POST request to add item to cart
      const response = await axios.post(
        "http://localhost:5000/api/cart",
        {
          product: item.id,
          quantity: 1,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove from wishlist using API
      await axios.delete(`http://localhost:5000/api/wishlist/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state and AsyncStorage
      const updatedItems = items.filter(
        (wishlistItem) => wishlistItem.id !== item.id
      );
      setItems(updatedItems);
      await AsyncStorage.setItem(
        "wishlist",
        JSON.stringify(updatedItems.map((i) => i.id))
      );

      console.log(response.data, "item added to cart");
      Alert.alert("Success", `"${item.name}" has been added to your cart!`);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", "Failed to add item to cart.");
    }
  };

  const removeItem = async (id: string) => {
    try {
      const userString = await AsyncStorage.getItem("user");
      const token = userString ? JSON.parse(userString).token : null;

      if (!token) {
        Alert.alert(
          "Login Required",
          "Please login to remove items from wishlist"
        );
        return;
      }

      await axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      await AsyncStorage.setItem(
        "wishlist",
        JSON.stringify(updatedItems.map((i) => i.id))
      );
      Alert.alert("Removed", "Item removed from wishlist");
    } catch (error) {
      console.error("Error updating wishlist:", error);
      Alert.alert("Error", "Failed to update wishlist");
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={12} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={12}
          color="#FFD700"
        />
      );
    }

    return stars;
  };

  const renderItem = ({ item }: { item: WishlistItem }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        {!item.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="heart" size={20} color="#FF6B9D" />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        <View style={styles.ratingContainer}>
          <View style={styles.stars}>{renderStars(item.rating)}</View>
          <Text style={styles.ratingText}>({item.rating})</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price.toLocaleString()}</Text>
          {item.originalPrice && (
            <>
              <Text style={styles.originalPrice}>
                ₹{item.originalPrice.toLocaleString()}
              </Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {Math.round(
                    ((item.originalPrice - item.price) / item.originalPrice) *
                      100
                  )}
                  % OFF
                </Text>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.cartButton,
            !item.inStock && styles.cartButtonDisabled,
          ]}
          onPress={() => moveToCart(item)}
          disabled={!item.inStock}
        >
          <Ionicons
            name="bag-add"
            size={16}
            color={item.inStock ? "#FFFFFF" : "#999999"}
          />
          <Text
            style={[
              styles.cartButtonText,
              !item.inStock && styles.cartButtonTextDisabled,
            ]}
          >
            {item.inStock ? "Move to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="heart-outline" size={80} color="#E0E0E0" />
      </View>
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Start adding items you love to your wishlist
      </Text>
      <TouchableOpacity style={styles.shopButton}>
        <LinearGradient
          colors={["#FF6B9D", "#C44569"]}
          style={styles.shopButtonGradient}
        >
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>
      {items.length > 0 && (
        <Text style={styles.itemCount}>
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </Text>
      )}
    </View>
  );

  const renderFooter = () => {
    if (items.length === 0) return null;

    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.moveAllButton}>
          <LinearGradient
            colors={["#FF6B9D", "#C44569"]}
            style={styles.moveAllButtonGradient}
          >
            <Ionicons name="bag-add" size={20} color="#FFFFFF" />
            <Text style={styles.moveAllButtonText}>Move All to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient colors={["#FFF0F5", "#F8E8FF"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF0F5" />

      {renderHeader()}

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#FF6B9D" />
        </View>
      ) : items.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight || 44,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C2C2C",
  },
  headerIcon: {
    backgroundColor: "#FFE8F0",
    padding: 12,
    borderRadius: 20,
  },
  itemCount: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 8,
    borderRadius: 20,
  },
  details: {
    padding: 16,
  },
  brand: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "500",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 8,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stars: {
    flexDirection: "row",
    marginRight: 6,
  },
  ratingText: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "500",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#999999",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#FF6B9D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  cartButtonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  cartButtonTextDisabled: {
    color: "#999999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 40,
    borderRadius: 100,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C2C2C",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  shopButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  shopButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    gap: 12,
  },
  moveAllButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  moveAllButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  moveAllButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FF6B9D",
  },
  continueButtonText: {
    color: "#FF6B9D",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WishlistScreen;

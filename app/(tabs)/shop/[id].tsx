// app/(tabs)/shop/[id].tsx
// app/(tabs)/shop/[id].tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const product = {
  id: 1,
  name: 'Pink Hoodie',
  price: 1500,
  originalPrice: 2999,
  discount: '50% Off',
  inStock: true,
  description:
    'Step into timeless style and all-day comfort. Designed for both performance and daily use.',
  image: require('../../../assets/images/hoodie.jpg'),
};

const similarProducts = [
  {
    id: 2,
    name: 'Western Top',
    image: require('../../../assets/images/sec.jpg'),
    price: '₹499',
  },
  {
    id: 3,
    name: 'Casual Kurti',
    image: require('../../../assets/images/kurti.jpg'),
    price: '₹799',
  },
];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>{product.name}</Text>
        <Ionicons name="cart-outline" size={24} />
      </View>

      {/* Product Image */}
      <Image source={product.image} style={styles.productImage} />

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
            <Text style={selectedSize === size ? styles.sizeTextSelected : styles.sizeText}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product Info */}
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.priceRow}>
        <Text style={styles.strike}>₹{product.originalPrice}</Text>{' '}
        <Text style={styles.discounted}>₹{product.price}</Text>{' '}
        <Text style={styles.discountText}>{product.discount}</Text>
      </Text>

      <Text style={styles.sectionTitle}>Product Details</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.stock}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.cartButton}>
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.similarCard}>
            <Image source={item.image} style={styles.similarImage} />
            <Text style={styles.similarName}>{item.name}</Text>
            <Text style={styles.similarPrice}>{item.price}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  sizeLabel: {
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#ff69b4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sizeButtonSelected: {
    backgroundColor: '#ff69b4',
    borderColor: '#ff69b4',
  },
  sizeText: {
    fontSize: 13,
    color: '#000',
  },
  sizeTextSelected: {
    color: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
  },
  priceRow: {
    fontSize: 14,
    marginBottom: 10,
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  discounted: {
    fontWeight: '600',
    fontSize: 15,
    color: '#000',
  },
  discountText: {
    color: '#d6336c',
    fontWeight: '600',
    fontSize: 13,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 14,
    marginBottom: 4,
  },
  description: {
    color: '#555',
    fontSize: 13,
    marginBottom: 10,
  },
  stock: {
    color: '#d6336c',
    fontWeight: '600',
    marginBottom: 10,
  },
  cartButton: {
    backgroundColor: '#ff69b4',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#ff69b4',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  similarCard: {
    marginRight: 14,
    width: 120,
  },
  similarImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 6,
  },
  similarName: {
    fontSize: 13,
    fontWeight: '600',
  },
  similarPrice: {
    fontSize: 12,
    color: '#444',
  },
});

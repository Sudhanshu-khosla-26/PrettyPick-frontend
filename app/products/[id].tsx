// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// const productData = [
//   {
//     id: '1',
//     name: 'Floral Summer Dress',
//     price: 1200,
//     image: require('../../assets/images/dress1.jpg'),
//   },
//   {
//     id: '2',
//     name: 'Casual Kurti',
//     price: 999,
//     image: require('../../assets/images/kurti.jpg'),
//   },
//   {
//     id: '3',
//     name: 'Pink Hoodie',
//     price: 1500,
//     image: require('../../assets/images/hoodie.jpg'),
//   },
//   {
//     id: '4',
//     name: 'Slim Fit Top',
//     price: 1600,
//     image: require('../../assets/images/fir.jpg'),
//   },
//   {
//     id: '5',
//     name: 'Western Top',
//     price: 1100,
//     image: require('../../assets/images/sec.jpg'),
//   },
//   {
//     id: '6',
//     name: 'Crop Top',
//     price: 800,
//     image: require('../../assets/images/thir.jpg'),
//   },
// ];

// const ProductDetail = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const product = productData.find((p) => p.id === id);

//   const [quantity, setQuantity] = useState(1);

//   if (!product) {
//     return (
//       <View style={styles.centered}>
//         <Text>Product not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={product.image} style={styles.image} />
//       <View style={styles.content}>
//         <Text style={styles.name}>{product.name}</Text>
//         <Text style={styles.price}>₹{product.price}</Text>

//         {/* Quantity Selector */}
//         <View style={styles.quantityRow}>
//           <Text style={styles.quantityLabel}>Quantity:</Text>
//           <View style={styles.quantityControl}>
//             <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
//               <Ionicons name="remove-circle" size={28} color="#ff69b4" />
//             </TouchableOpacity>
//             <Text style={styles.quantityText}>{quantity}</Text>
//             <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
//               <Ionicons name="add-circle" size={28} color="#ff69b4" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Add to Cart */}
//         <TouchableOpacity style={styles.addToCart}>
//           <Text style={styles.addToCartText}>Add to Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ProductDetail;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 320,
//     resizeMode: 'cover',
//   },
//   content: {
//     padding: 16,
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 6,
//   },
//   price: {
//     fontSize: 18,
//     color: '#888',
//     marginBottom: 16,
//   },
//   quantityRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   quantityLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginRight: 10,
//   },
//   quantityControl: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//   },
//   quantityText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginHorizontal: 8,
//   },
//   addToCart: {
//     backgroundColor: '#ff69b4',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   addToCartText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
// app/product/[id].tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const products = [
  {
    id: '1',
    name: 'Floral Summer Dress',
    price: 1200,
    image: require('../../assets/images/dress1.jpg'),
  },
  {
    id: '2',
    name: 'Casual Kurti',
    price: 999,
    image: require('../../assets/images/kurti.jpg'),
  },
  {
    id: '3',
    name: 'Pink Hoodie',
    price: 1500,
    image: require('../../assets/images/hoodie.jpg'),
  },
  {
    id: '4',
    name: 'Slim Fit Top',
    price: 1600,
    image: require('../../assets/images/fir.jpg'),
  },
  {
    id: '5',
    name: 'Western Top',
    price: 1100,
    image: require('../../assets/images/sec.jpg'),
  },
  {
    id: '6',
    name: 'Crop Top',
    price: 800,
    image: require('../../assets/images/thir.jpg'),
  },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} />

      <TouchableOpacity
        onPress={() => setIsWishlisted((prev) => !prev)}
        style={styles.wishlistIcon}
      >
        <Ionicons
          name={isWishlisted ? 'heart' : 'heart-outline'}
          size={28}
          color={isWishlisted ? '#ff69b4' : '#555'}
        />
      </TouchableOpacity>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.qtyBtn} onPress={decrementQty}>
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyNumber}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={incrementQty}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  wishlistIcon: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  qtyBtn: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  qtyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyNumber: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


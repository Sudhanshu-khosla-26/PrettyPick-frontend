// import React, { useState } from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// const initialProducts = [
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

// const ProductList = () => {
//   const router = useRouter();
//   const [wishlist, setWishlist] = useState<string[]>([]);

//   const toggleWishlist = (id: string) => {
//     if (wishlist.includes(id)) {
//       setWishlist(wishlist.filter(item => item !== id));
//     } else {
//       setWishlist([...wishlist, id]);
//     }
//   };

//   const renderItem = ({ item }: { item: typeof initialProducts[0] }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => router.push(`./product/${item.id}`)}
//     >
//       <Image source={item.image} style={styles.image} />
//       <TouchableOpacity
//         style={styles.heartIcon}
//         onPress={() => toggleWishlist(item.id)}
//       >
//         <Ionicons
//           name={wishlist.includes(item.id) ? 'heart' : 'heart-outline'}
//           size={22}
//           color={wishlist.includes(item.id) ? '#ff69b4' : '#aaa'}
//         />
//       </TouchableOpacity>
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.price}>₹{item.price}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>🛍️ Explore Products</Text>
//       <FlatList
//         data={initialProducts}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// export default ProductList;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 20,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginLeft: 16,
//     marginBottom: 12,
//   },
//   list: {
//     paddingHorizontal: 12,
//   },
//   card: {
//     flex: 1,
//     margin: 8,
//     backgroundColor: '#fdfdfd',
//     borderRadius: 12,
//     padding: 10,
//     alignItems: 'center',
//     elevation: 3,
//     position: 'relative',
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 14,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   price: {
//     fontSize: 13,
//     color: '#555',
//     marginTop: 4,
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 4,
//     elevation: 5,
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';

const allProducts = [
  { id: '1', name: 'Floral Summer Dress', category: 'Dresses', price: 1200, image: require('../../assets/images/dress1.jpg') },
  { id: '2', name: 'Casual Kurti', category: 'Kurtis', price: 999, image: require('../../assets/images/kurti.jpg') },
  { id: '3', name: 'Pink Hoodie', category: 'Tops', price: 1500, image: require('../../assets/images/hoodie.jpg') },
  { id: '4', name: 'Slim Fit Top', category: 'Tops', price: 1600, image: require('../../assets/images/fir.jpg') },
  { id: '5', name: 'Western Top', category: 'Tops', price: 1100, image: require('../../assets/images/sec.jpg') },
  { id: '6', name: 'Crop Top', category: 'Tops', price: 800, image: require('../../assets/images/thir.jpg') },
];

const categories = ['All', 'Tops', 'Kurtis', 'Dresses'];

const ProductList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = ({ item }: { item: typeof allProducts[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`./product/${item.id}`)}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
            style={[styles.categoryButton, selectedCategory === cat && styles.activeCategory]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={selectedCategory === cat ? styles.activeCategoryText : styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  search: {
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: '#ff69b4',
  },
  categoryText: {
    color: '#333',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
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
    fontWeight: '600',
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  addBtn: {
    marginTop: 8,
    backgroundColor: '#ff69b4',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  addText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

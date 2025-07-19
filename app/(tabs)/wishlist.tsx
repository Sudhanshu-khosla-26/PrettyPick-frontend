// import React from 'react';
// import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

// const wishlistItems = [
//   {
//     id: '1',
//     name: 'Floral Summer Dress',
//     price: 1200,
//     image: require('../../assets/images/dress1.jpg'),
//   },
//   {
//     id: '4',
//     name: 'Slim Fit Top',
//     price: 1600,
//     image: require('../../assets/images/fir.jpg'),
//   },
// ];

// const WishlistScreen = () => {
//   const renderItem = ({ item }: { item: typeof wishlistItems[0] }) => (
//     <View style={styles.card}>
//       <Image source={item.image} style={styles.image} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.price}>₹{item.price}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>❤️ Your Wishlist</Text>
//       <FlatList
//         data={wishlistItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// export default WishlistScreen;

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
//     paddingHorizontal: 16,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     backgroundColor: '#fdfdfd',
//     borderRadius: 10,
//     padding: 10,
//     elevation: 2,
//   },
//   image: {
//     width: 70,
//     height: 70,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   price: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
// });
// import React, { useState } from 'react';
// import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const initialWishlist = [
//   {
//     id: '1',
//     name: 'Floral Summer Dress',
//     price: 1200,
//     image: require('../../assets/images/dress1.jpg'),
//   },
//   {
//     id: '2',
//     name: 'Pink Hoodie',
//     price: 1500,
//     image: require('../../assets/images/hoodie.jpg'),
//   },
// ];

// export default function WishlistScreen() {
//   const [wishlist, setWishlist] = useState(initialWishlist);

//   const removeFromWishlist = (id: string) => {
//     setWishlist(prev => prev.filter(item => item.id !== id));
//   };

//   const renderItem = ({ item }: { item: typeof wishlist[0] }) => (
//     <View style={styles.card}>
//       <Image source={item.image} style={styles.image} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.price}>₹{item.price}</Text>
//         <View style={styles.buttons}>
//           <TouchableOpacity style={styles.cartButton}>
//             <Text style={styles.cartText}>Move to Cart</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
//             <Ionicons name="heart" size={24} color="#ff66b3" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>❤️ Your Wishlist</Text>
//       <FlatList
//         data={wishlist}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     paddingHorizontal: 16,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   list: {
//     paddingHorizontal: 12,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   details: {
//     flex: 1,
//     marginLeft: 14,
//     justifyContent: 'space-between',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   price: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   cartButton: {
//     backgroundColor: '#ff66b3',
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//   },
//   cartText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 13,
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialWishlist = [
  {
    id: '1',
    name: 'Floral Summer Dress',
    price: 1200,
    image: require('../../assets/images/dress1.jpg'),
    liked: true,
  },
  {
    id: '2',
    name: 'Western Top',
    price: 1100,
    image: require('../../assets/images/sec.jpg'),
    liked: true,
  },
];

export default function WishlistScreen() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const toggleLike = (id: string) => {
    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const renderItem = ({ item }: { item: typeof wishlist[0] }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleLike(item.id)}>
        <Ionicons
          name={item.liked ? 'heart' : 'heart-outline'}
          size={26}
          color={item.liked ? '#ff66b3' : '#aaa'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>❤️ Wishlist</Text>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

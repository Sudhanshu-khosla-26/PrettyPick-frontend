import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const wishlistItems = [
  {
    id: '1',
    name: 'Slim Fit Top',
    price: 1600,
    image: require('../assets/images/fir.jpg'),
  },
  {
    id: '2',
    name: 'Western Top',
    price: 1100,
    image: require('../assets/images/sec.jpg'),
  },
];

const WishlistScreen = () => {
  const renderItem = ({ item }: { item: typeof wishlistItems[0] }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <TouchableOpacity style={styles.removeButton}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>❤️ Your Wishlist</Text>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  removeButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  removeText: {
    color: '#fff',
    fontWeight: '600',
  },
});

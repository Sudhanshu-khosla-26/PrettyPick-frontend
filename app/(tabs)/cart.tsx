// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// const initialCartItems = [
//   {
//     id: '1',
//     title: 'Slim Fit Top',
//     price: 1600,
//     quantity: 1,
//     image: require('../../assets/images/fir.jpg'),
//   },
//   {
//     id: '2',
//     title: 'Western Top',
//     price: 1100,
//     quantity: 1,
//     image: require('../../assets/images/sec.jpg'),
//   },
// ];

// export default function CartScreen() {
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const insets = useSafeAreaInsets(); // 👈 for dynamic bottom padding

//   const updateQuantity = (id: string, change: number) => {
//     const updated = cartItems.map((item) =>
//       item.id === id
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     );
//     setCartItems(updated);
//   };

//   const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const renderItem = ({ item }: { item: typeof cartItems[0] }) => (
//     <View style={styles.item}>
//       <Image source={item.image} style={styles.image} />
//       <View style={styles.details}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.price}>₹{item.price} x {item.quantity}</Text>
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>
//             <Text style={styles.qtyText}>-</Text>
//           </TouchableOpacity>
//           <Text style={styles.qtyValue}>{item.quantity}</Text>
//           <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>
//             <Text style={styles.qtyText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={cartItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{
//           padding: 16,
//           paddingBottom: 120,
//         }}
//       />

//       <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
//         <Text style={styles.total}>Total: ₹{total}</Text>
//         <TouchableOpacity style={styles.checkoutButton}>
//           <Text style={styles.checkoutText}>Checkout</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   item: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     padding: 10,
//     elevation: 2,
//   },
//   image: {
//     width: 70,
//     height: 70,
//     borderRadius: 10,
//   },
//   details: {
//     marginLeft: 12,
//     flex: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   price: {
//     fontSize: 14,
//     color: '#555',
//     marginVertical: 4,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   qtyButton: {
//     backgroundColor: '#eee',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     marginHorizontal: 5,
//   },
//   qtyText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   qtyValue: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   footer: {
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   total: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   checkoutButton: {
//     backgroundColor: '#ff69b4',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   checkoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
// import React from 'react';
// import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const cartItems = [
//   {
//     id: 1,
//     title: 'Slim Fit Top',
//     subtitle: 'Born to Stand Out',
//     price: 1600,
//     size: '34',
//     qty: 1,
//     delivery: '10 May 20XX',
//     image: './assets/images/fir.jpg',
//   },
//   {
//     id: 2,
//     title: 'Casual Kurti',
//     subtitle: 'Casual Kurti 100% Cotton',
//     price: 999,
//     size: '42',
//     qty: 1,
//     delivery: '10 May 20XX',
//     image: './assets/images/kurti.jpg',
//   },
// ];

// const CartScreen = () => {
//   const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.heading}>My Cart</Text>

//       {cartItems.map((item) => (
//         <View key={item.id} style={styles.card}>
//           <Image source={{ uri: item.image }} style={styles.image} />
//           <View style={styles.details}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.subtitle}>{item.subtitle}</Text>

//             <View style={styles.row}>
//               <Text style={styles.label}>Size</Text>
//               <Text style={styles.value}>{item.size}</Text>

//               <Text style={[styles.label, { marginLeft: 16 }]}>Qty</Text>
//               <Text style={styles.value}>{item.qty}</Text>
//             </View>

//             <Text style={styles.delivery}>Delivery by {item.delivery}</Text>
//           </View>
//         </View>
//       ))}

//       <View style={styles.couponSection}>
//         <Ionicons name="pricetags" size={20} />
//         <Text style={styles.couponLabel}>Apply Coupons</Text>
//         <TouchableOpacity style={styles.selectButton}>
//           <Text style={styles.selectText}>Select</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.summary}>
//         <Text style={styles.sectionTitle}>Order Payment Details</Text>

//         <View style={styles.summaryRow}>
//           <Text>Order Amounts</Text>
//           <Text>₹ {total.toFixed(2)}</Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text>Convenience</Text>
//           <Text style={styles.linkText}>Know More</Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text>Delivery Fee</Text>
//           <Text style={{ color: 'green' }}>Free</Text>
//         </View>

//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Order Total</Text>
//           <Text style={styles.totalValue}>₹ {total.toFixed(2)}</Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.payButton}>
//         <Text style={styles.payText}>Proceed to Payment</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 12,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 12,
//     alignItems: 'center',
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//   },
//   details: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   subtitle: {
//     fontSize: 13,
//     color: '#555',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 6,
//   },
//   label: {
//     fontSize: 13,
//     color: '#555',
//     marginRight: 4,
//   },
//   value: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   delivery: {
//     fontSize: 12,
//     color: '#777',
//   },
//   couponSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 16,
//     padding: 12,
//     backgroundColor: '#eee',
//     borderRadius: 8,
//   },
//   couponLabel: {
//     marginLeft: 8,
//     fontSize: 14,
//     flex: 1,
//   },
//   selectButton: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 6,
//   },
//   selectText: {
//     fontSize: 13,
//     color: '#555',
//   },
//   summary: {
//     backgroundColor: '#f2f2f2',
//     borderRadius: 10,
//     padding: 14,
//     marginVertical: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     marginBottom: 10,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 4,
//   },
//   totalRow: {
//     marginTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     paddingTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   totalValue: {
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   payButton: {
//     backgroundColor: '#1A7F64',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   payText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   linkText: {
//     color: '#e91e63',
//   },
// });
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const cartItems = [
  {
    id: 1,
    title: 'Slim Fit Top',
    subtitle: 'Born to Stand Out',
    price: 1600,
    size: '34',
    qty: 1,
    delivery: '10 May 20XX',
    image: require('../../assets/images/fir.jpg'), // ✅ using require
  },
  {
    id: 2,
    title: 'Casual Kurti',
    subtitle: 'Casual Kurti 100% Cotton',
    price: 999,
    size: '42',
    qty: 1,
    delivery: '10 May 20XX',
    image: require('../../assets/images/kurti.jpg'),
  },
];

const CartScreen = () => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Cart</Text>

      {cartItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Size</Text>
              <Text style={styles.value}>{item.size}</Text>

              <Text style={[styles.label, { marginLeft: 16 }]}>Qty</Text>
              <Text style={styles.value}>{item.qty}</Text>
            </View>

            <Text style={styles.delivery}>Delivery by {item.delivery}</Text>
          </View>
        </View>
      ))}

      <View style={styles.couponSection}>
        <Ionicons name="pricetags" size={20} />
        <Text style={styles.couponLabel}>Apply Coupons</Text>
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectText}>Select</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.sectionTitle}>Order Payment Details</Text>

        <View style={styles.summaryRow}>
          <Text>Order Amount</Text>
          <Text>₹ {total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Convenience</Text>
          <Text style={styles.linkText}>Know More</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Delivery Fee</Text>
          <Text style={{ color: 'green' }}>Free</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Order Total</Text>
          <Text style={styles.totalValue}>₹ {total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
  delivery: {
    fontSize: 12,
    color: '#777',
  },
  couponSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  couponLabel: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  selectButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
  },
  selectText: {
    fontSize: 13,
    color: '#555',
  },
  summary: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 14,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalRow: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  payButton: {
    backgroundColor: '#ff69b4',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#e91e63',
  },
});

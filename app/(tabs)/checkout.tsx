import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CheckoutScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="#000"
          onPress={() => router.back()}
        />
        <Text style={styles.headerText}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Price Summary */}
      <View style={styles.priceSection}>
        <View style={styles.row}>
          <Text>Order</Text>
          <Text>₹ 7,000</Text>
        </View>
        <View style={styles.row}>
          <Text>Shipping</Text>
          <Text>₹ 30</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalLabel}>₹ 7,030</Text>
        </View>
      </View>

      {/* Payment Section */}
      <Text style={styles.paymentLabel}>Payment</Text>
      <View style={styles.paymentCard}>
        <Image source={require('../../assets/images/visa.png')} style={styles.logo} />
        <Text>********2109</Text>
      </View>
      <View style={styles.paymentCard}>
        <Image source={require('../../assets/images/paypal.png')} style={styles.logo} />
        <Text>********2109</Text>
      </View>
      <View style={styles.paymentCard}>
        <Image source={require('../../assets/images/mastercard.png')} style={styles.logo} />
        <Text>********2109</Text>
      </View>
      <View style={styles.paymentCard}>
        <Image source={require('../../assets/images/upi.png')} style={styles.logo} />
        <Text>********2109</Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => router.push('/payment-success')}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  priceSection: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  totalLabel: {
    fontWeight: '700',
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    gap: 12,
  },
  logo: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
  },
  continueBtn: {
    backgroundColor: '#ff69b4',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  continueText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

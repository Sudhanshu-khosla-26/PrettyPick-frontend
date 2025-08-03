import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PaymentCard {
  id: string;
  type: "visa" | "mastercard" | "paypal" | "upi";
  lastFour: string;
  holderName: string;
  expiryDate: string;
}

interface CheckoutData {
  cartItems: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  timestamp: number;
}

const CheckoutScreen = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [savedCards, setSavedCards] = useState<PaymentCard[]>([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    holderName: "",
    expiryDate: "",
    cvv: "",
    type: "visa" as "visa" | "mastercard" | "paypal" | "upi",
  });

  // Place Order API call
  const placeOrder = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      const token = userString ? JSON.parse(userString).token : null;
      const user = userString ? JSON.parse(userString).user : null;

      if (!checkoutData) {
        Alert.alert("Error", "No checkout data found");
        return;
      }

      let deliveryAddress = {
        street: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
      };

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          deliveryAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = await response;
      console.log("Order placed successfully:", order.data);
      Alert.alert("Success", "Order placed successfully!");
      router.push("/shop/payment-success");
    } catch (error: any) {
      console.error("Error placing order:", error);
      Alert.alert("Error", error.message || "Failed to place order");
    }
  };

  useEffect(() => {
    loadSavedCards();
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    try {
      const data = await AsyncStorage.getItem("checkoutData");
      if (data) {
        const parsedData = JSON.parse(data);
        setCheckoutData(parsedData);
      } else {
        // Fallback data if no cart data is found
        setCheckoutData({
          cartItems: [],
          subtotal: 7000,
          deliveryFee: 30,
          total: 7030,
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error("Error loading checkout data:", error);
    }
  };

  const loadSavedCards = async () => {
    try {
      const cards = await AsyncStorage.getItem("savedCards");
      if (cards) {
        setSavedCards(JSON.parse(cards));
      }
    } catch (error) {
      console.error("Error loading saved cards:", error);
    }
  };

  const saveCard = async () => {
    if (!newCard.cardNumber || !newCard.holderName || !newCard.expiryDate) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const card: PaymentCard = {
      id: Date.now().toString(),
      type: newCard.type,
      lastFour: newCard.cardNumber.slice(-4),
      holderName: newCard.holderName,
      expiryDate: newCard.expiryDate,
    };

    try {
      const updatedCards = [...savedCards, card];
      await AsyncStorage.setItem("savedCards", JSON.stringify(updatedCards));
      setSavedCards(updatedCards);
      setSelectedPayment(card.id);
      setShowAddCardModal(false);
      setNewCard({
        cardNumber: "",
        holderName: "",
        expiryDate: "",
        cvv: "",
        type: "visa",
      });
      Alert.alert("Success", "Card saved successfully!");
    } catch (error) {
      console.error("Error saving card:", error);
      Alert.alert("Error", "Failed to save card");
    }
  };

  const getCardLogo = (type: string) => {
    switch (type) {
      case "visa":
        return require("../../../assets/images/visa.png");
      case "mastercard":
        return require("../../../assets/images/mastercard.webp");
      case "paypal":
        return require("../../../assets/images/paypal.png");
      case "upi":
        return require("../../../assets/images/upi.png");
      default:
        return require("../../../assets/images/visa.png");
    }
  };

  const handleContinue = async () => {
    if (!selectedPayment) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }

    // Save payment method for processing
    try {
      await AsyncStorage.setItem("selectedPaymentMethod", selectedPayment);
      await placeOrder();
    } catch (error) {
      console.error("Error saving payment method:", error);
    }
  };

  if (!checkoutData) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading checkout...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={styles.itemCount}>
          {checkoutData.cartItems.length} item
          {checkoutData.cartItems.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Price Summary */}
      <View style={styles.priceSection}>
        <View style={styles.row}>
          <Text>Order Amount</Text>
          <Text>₹ {checkoutData.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Delivery Fee</Text>
          <Text>₹ {checkoutData.deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalLabel}>
            ₹ {checkoutData.total.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Payment Section */}
      <Text style={styles.paymentLabel}>Payment Method</Text>

      {/* Cash on Delivery Option */}
      <TouchableOpacity
        style={[
          styles.paymentCard,
          selectedPayment === "cod" && styles.selectedPaymentCard,
        ]}
        onPress={() => setSelectedPayment("cod")}
      >
        <View style={styles.codIcon}>
          <Ionicons name="cash-outline" size={24} color="#4CAF50" />
        </View>
        <Text style={styles.paymentText}>Cash on Delivery</Text>
        {selectedPayment === "cod" && (
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
        )}
      </TouchableOpacity>

      {/* Saved Cards */}
      {savedCards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={[
            styles.paymentCard,
            selectedPayment === card.id && styles.selectedPaymentCard,
          ]}
          onPress={() => setSelectedPayment(card.id)}
        >
          <Image source={getCardLogo(card.type)} style={styles.logo} />
          <View style={styles.cardInfo}>
            <Text style={styles.paymentText}>****{card.lastFour}</Text>
            <Text style={styles.cardHolder}>{card.holderName}</Text>
          </View>
          {selectedPayment === card.id && (
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          )}
        </TouchableOpacity>
      ))}

      {/* Add New Card Button */}
      <TouchableOpacity
        style={styles.addCardBtn}
        onPress={() => setShowAddCardModal(true)}
      >
        <Ionicons name="add-circle-outline" size={24} color="#ff69b4" />
        <Text style={styles.addCardText}>Add New Card</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>
          Pay ₹ {checkoutData.total.toFixed(2)}
        </Text>
      </TouchableOpacity>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCardModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddCardModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Card</Text>
            <TouchableOpacity onPress={saveCard}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                value={newCard.cardNumber}
                onChangeText={(text) =>
                  setNewCard({ ...newCard, cardNumber: text })
                }
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                value={newCard.holderName}
                onChangeText={(text) =>
                  setNewCard({ ...newCard, holderName: text })
                }
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={newCard.expiryDate}
                  onChangeText={(text) =>
                    setNewCard({ ...newCard, expiryDate: text })
                  }
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  value={newCard.cvv}
                  onChangeText={(text) => setNewCard({ ...newCard, cvv: text })}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Type</Text>
              <View style={styles.cardTypeRow}>
                {["visa", "mastercard", "paypal", "upi"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.cardTypeOption,
                      newCard.type === type && styles.selectedCardType,
                    ]}
                    onPress={() =>
                      setNewCard({ ...newCard, type: type as any })
                    }
                  >
                    <Image
                      source={getCardLogo(type)}
                      style={styles.cardTypeLogo}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
  },
  orderSummary: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  itemCount: {
    fontSize: 14,
    color: "#666",
  },
  priceSection: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  totalLabel: {
    fontWeight: "700",
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    gap: 12,
  },
  selectedPaymentCard: {
    borderColor: "#4CAF50",
    backgroundColor: "#f0f8f0",
  },
  codIcon: {
    width: 40,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 25,
    resizeMode: "contain",
  },
  cardInfo: {
    flex: 1,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "500",
  },
  cardHolder: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  addCardBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff69b4",
    marginBottom: 12,
    gap: 12,
    justifyContent: "center",
  },
  addCardText: {
    color: "#ff69b4",
    fontWeight: "600",
    fontSize: 16,
  },
  continueBtn: {
    backgroundColor: "#ff69b4",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  cancelText: {
    color: "#666",
    fontSize: 16,
  },
  saveText: {
    color: "#ff69b4",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  cardTypeRow: {
    flexDirection: "row",
    gap: 12,
  },
  cardTypeOption: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  selectedCardType: {
    borderColor: "#ff69b4",
    backgroundColor: "#fff0f5",
  },
  cardTypeLogo: {
    width: 40,
    height: 25,
    resizeMode: "contain",
  },
});

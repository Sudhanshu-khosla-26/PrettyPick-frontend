import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("user")!).user;
  const [email, setEmail] = useState(user.email! || "");
  const [password, setPassword] = useState("");
  const [pincode, setPincode] = useState(user.pincode! || "");
  const [address, setAddress] = useState(user.address || "");
  const [city, setCity] = useState(user.city || "");
  const [state, setState] = useState(user.state || "");
  const [country, setCountry] = useState(user.country || "");
  const [accountNumber, setAccountNumber] = useState(user.accountNumber || "");
  const [accountHolder, setAccountHolder] = useState(user.accountHolder || "");
  const [ifsc, setIfsc] = useState(user.ifsc || "");
  const token = JSON.parse(localStorage.getItem("user")!).token;
  console.log(user, "user");

  const handleSave = async () => {
    const result = await axios.post(
      "http://localhost:5000/api/auth/update-profile",
      {
        pincode,
        address,
        city,
        state,
        country,
        accountNumber,
        accountHolder,
        ifsc,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("user", JSON.stringify({ token, ...result.data }));
    console.log(result.data.user, "result");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backArrow}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>My Account</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="pencil" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Personal Details */}
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <TouchableOpacity>
        <Text style={styles.link}>Change Password</Text>
      </TouchableOpacity>

      {/* Business Address Details */}
      <Text style={styles.sectionTitle}>Business Address Details</Text>
      <TextInput
        style={styles.input}
        value={pincode}
        onChangeText={setPincode}
      />
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput style={styles.input} value={city} onChangeText={setCity} />
      <TextInput style={styles.input} value={state} onChangeText={setState} />
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
      />

      {/* Bank Account Details */}
      <Text style={styles.sectionTitle}>Bank Account Details</Text>
      <TextInput
        style={styles.input}
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <TextInput
        style={styles.input}
        value={accountHolder}
        onChangeText={setAccountHolder}
      />
      <TextInput style={styles.input} value={ifsc} onChangeText={setIfsc} />

      <TouchableOpacity style={styles.saveButton}>
        <Text onPress={handleSave} style={styles.saveText}>
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  backArrow: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: "absolute",
    right: 120,
    bottom: 0,
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  link: {
    color: "#ff66b3",
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#ff69b4",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

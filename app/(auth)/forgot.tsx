import { Link } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./authStyles";

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/forgot_illustration.png")}
        style={styles.illustration}
      />

      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to reset it</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <Link href="/signin" style={styles.linkText}>
        Back to Sign In
      </Link>
    </View>
  );
};

export default ForgotPassword;

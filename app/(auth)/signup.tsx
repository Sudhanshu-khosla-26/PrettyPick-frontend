import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  // ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./authStyles";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let submit = async () => {
    if (!email || !fullName || !password || !confirmPassword) {
      alert("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password did not matched");
      return;
    }

    const user = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        email: email,
        password: confirmPassword,
      }),
    });

    if (user) {
      AsyncStorage.setItem("user", JSON.stringify(user));
      setFullName("");
      setConfirmPassword("");
      setPassword("");
      setEmail("");
      router.replace("/(tabs)/home/home");
    }
  };

  React.useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        router.replace("/(tabs)/home");
      }
    };
    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/signup_illustration.webp")}
        style={styles.illustration}
      />

      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Join us and explore the best deals!</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      {/* <View style={styles.socialIcons}>
        <Image source={require('../../assets/images/google.png')} style={styles.icon} />
        <Image source={require('../../assets/images/facebook.png')} style={styles.icon} />
      </View> */}

      <Text style={styles.bottomText}>
        Already have an account?{" "}
        <Link href="/signin" style={styles.linkText}>
          Sign In
        </Link>
      </Text>
    </View>
  );
}

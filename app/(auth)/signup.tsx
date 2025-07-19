// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import React from 'react';
// import { router } from 'expo-router';

// const SignUpScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <TextInput placeholder="Name" style={styles.input} />
//       <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} />
//       <TextInput placeholder="Password" secureTextEntry style={styles.input} />
//       <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} />

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('./auth/signin')}>
//         <Text style={styles.link}>Already have an account? Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SignUpScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 24,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 32,
//     textAlign: 'center',
//     color: '#111',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 14,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#ff66b3',
//     paddingVertical: 16,
//     borderRadius: 8,
//     marginTop: 8,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   link: {
//     color: '#888',
//     marginTop: 16,
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//   },
// });
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

    localStorage.setItem("user", JSON.stringify(user));

    if (user) {
      setFullName("");
      setConfirmPassword("");
      setPassword("");
      setEmail("");
      router.replace("/(tabs)/home");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/signup-illustration.png")}
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

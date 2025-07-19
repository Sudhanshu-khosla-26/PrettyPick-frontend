// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { router } from 'expo-router';

// const SignInScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <Text style={styles.title}>Welcome Back!</Text>

//       <TextInput
//         placeholder="Email"
//         placeholderTextColor="#999"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="#999"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.replace('./auth/signup')}>
//         <Text style={styles.link}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// export default SignInScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#ff66b3',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ff66b3',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#ff66b3',
//     paddingVertical: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   link: {
//     textAlign: 'center',
//     color: '#888',
//     textDecorationLine: 'underline',
//   },
// });
// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
// import { Link } from 'expo-router';
// import styles from './authStyles';

// const SignIn = () => {
//   return (
//     <View style={styles.container}>
//       <Image source={require('../../assets/images/signin-illustration.png')} style={styles.illustration} />

//       <Text style={styles.title}>Welcome Back</Text>
//       <Text style={styles.subtitle}>Login to your account</Text>

//       <TextInput placeholder="Email" placeholderTextColor="#999" style={styles.input} />
//       <TextInput placeholder="Password" placeholderTextColor="#999" secureTextEntry style={styles.input} />

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>

//       <View style={styles.linkRow}>
//         <Link href="/signup" style={styles.linkText}>Don't have an account?</Link>
//         <Link href="/forgot" style={styles.linkText}>Forgot Password?</Link>
//       </View>
//     </View>
//   );
// };

// export default SignIn;
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Inside your component:

const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    if (!email || !password) {
      alert("All the field are required");
      return;
    }

    const user = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (user) {
      router.replace("/(tabs)/home");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../../assets/images/signin-illustration.png")}
        style={styles.illustration}
      />

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={Login}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/forgot")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.bottomText}>{`Don't have an account?`}</Text>
        <Link href="/signup" style={styles.linkText}>
          Sign Up
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
  illustration: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ff66b3",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ff66b3",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff66b3",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  forgotText: {
    alignSelf: "flex-end",
    color: "#1A7F64",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    gap: 6,
  },
  bottomText: {
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#ff66b3",
    fontWeight: "600",
  },
});

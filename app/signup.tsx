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
// import { useRouter } from 'expo-router';

// export default function SignUpScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignUp = () => {
//     if (!email || !password || !confirmPassword) {
//       alert('Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     // 🔐 Placeholder for actual signup logic
//     router.replace('./tabs'); // Redirect to main app after signup
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <Text style={styles.title}>Sign Up</Text>

//       <TextInput
//         placeholder="Email"
//         placeholderTextColor="#aaa"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="#aaa"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Confirm Password"
//         placeholderTextColor="#aaa"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//         <Text style={styles.buttonText}>Create Account</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('/signin')}>
//         <Text style={styles.link}>Already have an account? Sign In</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 32,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     marginBottom: 32,
//     color: '#ff69b4',
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 14,
//     marginBottom: 20,
//     fontSize: 16,
//     backgroundColor: '#fdfdfd',
//   },
//   button: {
//     backgroundColor: '#ff69b4',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   link: {
//     textAlign: 'center',
//     color: '#999',
//     marginTop: 10,
//   },
// });
// app/signup.tsx
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
// import { useRouter } from 'expo-router';

// export default function SignUpScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = () => {
//     if (!email || !password) {
//       alert('Please enter both email and password');
//     } else {
//       // Simulated sign-up success
//       alert('Account created successfully!');
//       router.replace('./tabs');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={styles.container}
//     >
//       <Text style={styles.title}>Sign Up</Text>

//       <TextInput
//         placeholder="Email"
//         placeholderTextColor="#aaa"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="#aaa"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('/signin')}>
//         <Text style={styles.link}>Already have an account? Sign In</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 32,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     marginBottom: 32,
//     color: '#ff69b4',
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 14,
//     marginBottom: 20,
//     fontSize: 16,
//     backgroundColor: '#fdfdfd',
//   },
//   button: {
//     backgroundColor: '#ff69b4',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   link: {
//     textAlign: 'center',
//     color: '#999',
//     marginTop: 10,
//   },
// });
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('./auth/signin')}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#111',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#ff69b4',
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
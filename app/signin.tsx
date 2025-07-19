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

// export default function SignInScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = () => {
//     // 🔐 Placeholder: Add authentication logic here
//     if (email && password) {
//       router.replace('./tabs'); // Redirect to the main app after login
//     } else {
//       alert('Please enter both email and password');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={styles.container}
//     >
//       <Text style={styles.title}>Sign In</Text>

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

//       <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('/signup')}>
//         <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
// app/signin.tsx
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

// export default function SignInScreen() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = () => {
//     if (!email || !password) {
//       alert('Please enter both email and password');
//     } else {
//       // Simulated login success
//       router.replace('./tabs');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={styles.container}
//     >
//       <Text style={styles.title}>Sign In</Text>

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

//       <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push('/signup')}>
//         <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
// export default SignIn;

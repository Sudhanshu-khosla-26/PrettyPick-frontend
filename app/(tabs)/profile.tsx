// import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
// import useAuth from '../../hooks/useAuth';

// const ProfileScreen = () => {
//   const { user, logout, loading } = useAuth();

//   const handleEditProfile = () => {
//     alert('Edit Profile tapped!');
//   };

//   const handleLogout = () => {
//     logout(); // Will trigger redirect in app/_layout.tsx
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#ff69b4" />
//       </View>
//     );
//   }

//   if (!user) return null;

//   return (
//     <View style={styles.container}>
//       <View style={styles.avatarContainer}>
//         <Image
//           source={require('../../assets/images/avatar.png')}
//           style={styles.avatar}
//         />
//       </View>

//       <Text style={styles.name}>{user.name}</Text>
//       <Text style={styles.email}>{user.email}</Text>

//       <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
//         <Text style={styles.buttonText}>Edit Profile</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
//         <Text style={styles.buttonText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 24,
//   },
//   avatarContainer: {
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#ff69b4',
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   email: {
//     fontSize: 16,
//     color: '#777',
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: '#ff69b4',
//     paddingVertical: 12,
//     paddingHorizontal: 36,
//     borderRadius: 25,
//     marginVertical: 8,
//     width: '70%',
//     alignItems: 'center',
//   },
//   logoutButton: {
//     backgroundColor: '#ff3366',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [email, setEmail] = useState('deepti302006@gmail.com');
  const [password, setPassword] = useState('********');
  const [pincode, setPincode] = useState('110007');
  const [address, setAddress] = useState('H.No. 473, Power House Colony');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [country, setCountry] = useState('India');
  const [accountNumber, setAccountNumber] = useState('204356XXXXXX');
  const [accountHolder, setAccountHolder] = useState('Abhiraj Sisodiya');
  const [ifsc, setIfsc] = useState('SBIN00428');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backArrow}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>My Account</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="pencil" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Personal Details */}
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} value={password} secureTextEntry editable={false} />
      <TouchableOpacity>
        <Text style={styles.link}>Change Password</Text>
      </TouchableOpacity>

      {/* Business Address Details */}
      <Text style={styles.sectionTitle}>Business Address Details</Text>
      <TextInput style={styles.input} value={pincode} onChangeText={setPincode} />
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} value={city} onChangeText={setCity} />
      <TextInput style={styles.input} value={state} onChangeText={setState} />
      <TextInput style={styles.input} value={country} onChangeText={setCountry} />

      {/* Bank Account Details */}
      <Text style={styles.sectionTitle}>Bank Account Details</Text>
      <TextInput style={styles.input} value={accountNumber} onChangeText={setAccountNumber} />
      <TextInput style={styles.input} value={accountHolder} onChangeText={setAccountHolder} />
      <TextInput style={styles.input} value={ifsc} onChangeText={setIfsc} />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  backArrow: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIcon: {
    position: 'absolute',
    right: 120,
    bottom: 0,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  link: {
    color: '#ff66b3',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#ff69b4',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


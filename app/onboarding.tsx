// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';

// const OnboardingScreen = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../assets/images/onboarding.png')}
//         style={styles.image}
//         resizeMode="contain"
//       />
//       <Text style={styles.title}>Welcome to Pretty Pink</Text>
//       <Text style={styles.subtitle}>
//         Discover fashion that defines your personality. Let’s get started!
//       </Text>

//       <TouchableOpacity style={styles.button} onPress={() => router.push('/signin')}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default OnboardingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff0f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 24,
//   },
//   image: {
//     width: '100%',
//     height: 300,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ff69b4',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#555',
//     marginBottom: 30,
//     paddingHorizontal: 10,
//   },
//   button: {
//     backgroundColor: '#ff69b4',
//     paddingVertical: 12,
//     paddingHorizontal: 36,
//     borderRadius: 25,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function Onboarding() {
//   const router = useRouter();

//   return (
//     <ImageBackground
//       source={require('../assets/images/onboarding.png')} // Replace with your image
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Welcome to Pretty Pink!</Text>
//         <Text style={styles.subtitle}>Your style journey starts here.</Text>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => router.push('/signin')}
//         >
//           <Text style={styles.buttonText}>Sign In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#fff' }]}
//           onPress={() => router.push('/signup')}
//         >
//           <Text style={[styles.buttonText, { color: '#ff69b4' }]}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#ffe4f2',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#ff69b4',
//     paddingVertical: 14,
//     paddingHorizontal: 36,
//     borderRadius: 25,
//     marginBottom: 16,
//     width: '80%',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });
// app/onboarding.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function Onboarding() {
//   const router = useRouter();

//   return (
//     <ImageBackground
//       source={require('../assets/images/onboarding.png')}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Welcome to Pretty Pink!</Text>
//         <Text style={styles.subtitle}>Your style journey starts here.</Text>

//         <TouchableOpacity style={styles.button} onPress={() => router.push('/signin')}>
//           <Text style={styles.buttonText}>Sign In</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: '#fff' }]}
//           onPress={() => router.push('/signup')}
//         >
//           <Text style={[styles.buttonText, { color: '#ff69b4' }]}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 32,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#ffe4f2',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#ff69b4',
//     paddingVertical: 14,
//     paddingHorizontal: 36,
//     borderRadius: 25,
//     marginBottom: 16,
//     width: '80%',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });
// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { onboardingData } from '../constants/onboardingData';

// const { width } = Dimensions.get('window');

// const Onboarding = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const router = useRouter();
//   const flatListRef = useRef<FlatList>(null);

//   const handleNext = () => {
//     if (currentIndex < onboardingData.length - 1) {
//       flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
//     } else {
//       router.replace('/signin');
//     }
//   };

//   const handleSkip = () => {
//     router.replace('/signin');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.topRow}>
//         <Text>{`${currentIndex + 1}/3`}</Text>
//         <TouchableOpacity onPress={handleSkip}>
//           <Text style={styles.skip}>Skip</Text>
//         </TouchableOpacity>
//       </View>

//       {/* FlatList for onboarding screens */}
//       <FlatList
//         ref={flatListRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         data={onboardingData}
//         onScroll={(e) => {
//           const index = Math.round(
//             e.nativeEvent.contentOffset.x / width
//           );
//           setCurrentIndex(index);
//         }}
//         renderItem={({ item }) => (
//           <View style={styles.slide}>
//             <Image source={item.image} style={styles.image} />
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.desc}>{item.description}</Text>
//           </View>
//         )}
//       />

//       {/* Pagination Dots */}
//       <View style={styles.dots}>
//         {onboardingData.map((_, i) => (
//           <View
//             key={i}
//             style={[
//               styles.dot,
//               { backgroundColor: i === currentIndex ? '#000' : '#ccc' },
//             ]}
//           />
//         ))}
//       </View>

//       {/* Footer Buttons */}
//       <View style={styles.footer}>
//         {currentIndex !== 0 && (
//           <Text style={styles.prev}>Prev</Text>
//         )}
//         <TouchableOpacity onPress={handleNext}>
//           <Text style={styles.next}>
//             {currentIndex === onboardingData.length - 1
//               ? 'Get Started'
//               : 'Next'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Onboarding;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   skip: {
//     color: '#f00',
//     fontWeight: '500',
//   },
//   slide: {
//     width: width - 40,
//     alignItems: 'center',
//   },
//   image: {
//     width: 280,
//     height: 280,
//     marginBottom: 30,
//     resizeMode: 'contain',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   desc: {
//     fontSize: 14,
//     color: '#777',
//     textAlign: 'center',
//     paddingHorizontal: 10,
//   },
//   dots: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   dot: {
//     height: 8,
//     width: 8,
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   prev: {
//     color: '#999',
//   },
//   next: {
//     color: '#d6336c',
//     fontWeight: '600',
//   },
// });
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { onboardingData } from "../constants/onboardingData";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToOffset({
        offset: newIndex * width,
        animated: true,
      });
    } else {
      router.replace("/signin");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToOffset({
        offset: newIndex * width,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/signin");
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topRow}>
        <Text>{`${currentIndex + 1}/${onboardingData.length}`}</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={onboardingData}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {onboardingData.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? "#000" : "#ccc" },
            ]}
          />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity disabled={currentIndex === 0} onPress={handlePrev}>
          <Text style={[styles.prev, currentIndex === 0 && { opacity: 0.4 }]}>
            Prev
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.next}>
            {currentIndex === onboardingData.length - 1
              ? "Get Started"
              : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  skip: {
    color: "#f00",
    fontWeight: "500",
  },
  slide: {
    width: width - 40,
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 30,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prev: {
    color: "#999",
    fontSize: 16,
  },
  next: {
    color: "#d6336c",
    fontWeight: "600",
    fontSize: 16,
  },
});

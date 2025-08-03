// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React from "react";
// import { Text, View } from "react-native";

// const password = () => {
//   const clear = async () => {
//     const user = await AsyncStorage.getItem("user");
//     const token = user ? JSON.parse(user).token : null;
//     await axios.post(
//       "http://localhost:5000/api/cart/clear",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   };

//   return (
//     <View>
//       <Text onPress={clear}>clear me </Text>
//     </View>
//   );
// };

// export default password;

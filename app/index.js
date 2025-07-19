import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [message, setMessage] = useState('Connecting...');

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(res => {
        console.log(res, "response");
        return res.text();
      })
      .then(data => setMessage(data))
      .catch(err => {
        console.error('Error:', err);
        setMessage('❌ Failed to connect');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
  },
});


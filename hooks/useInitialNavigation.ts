import { useEffect } from 'react';
import { router } from 'expo-router';

export default function useInitialNavigation() {
  const isFirstLaunch = true; // Replace this with AsyncStorage or logic
  const isLoggedIn = false;   // Replace this with real auth check

  useEffect(() => {
    if (isFirstLaunch) {
      router.replace('/onboarding');
    } else if (!isLoggedIn) {
      router.replace('./auth/signin');
    } else {
      router.replace('/(tabs)');
    }
  }, []);
}

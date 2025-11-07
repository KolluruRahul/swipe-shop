
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductDetail from './src/screens/ProductDetail';
import { loadPrefs } from './src/services/storage';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [hasPrefs, setHasPrefs] = useState<boolean | null>(null);

  useEffect(()=> {
    (async ()=> {
      const p = await loadPrefs();
      setHasPrefs(!!p);
      setReady(true);
    })();
  }, []);

  if (!ready) return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator /></View>

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{headerShown:false}}>
        { !hasPrefs && <Stack.Screen name="Onboarding" component={OnboardingScreen} /> }
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Product" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

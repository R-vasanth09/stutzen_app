import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/Loginscreen';
import Productlist from '../screen/Productlist';
import Cartscreen from '../screen/Cartscreen';
import Checkoutscreen from '../screen/Checkoutscreen';
const Stack = createNativeStackNavigator();

const Stacknav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Productlist"
        component={Productlist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cartscreen"
        component={Cartscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkoutscreen"
        component={Checkoutscreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Stacknav;

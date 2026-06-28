import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stacknav from './SRC/naviagtion/Stacknav';
import { Provider } from 'react-redux';
import { store } from './SRC/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stacknav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});

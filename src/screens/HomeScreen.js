// HomeScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {

  useEffect(() => {
    console.log("Welcome to Home Screen...")
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

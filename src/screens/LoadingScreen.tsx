import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loader from '../components/Loader';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;

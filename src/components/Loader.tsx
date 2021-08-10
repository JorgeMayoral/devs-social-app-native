import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default Loader;

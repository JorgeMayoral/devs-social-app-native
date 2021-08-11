import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Navbar = ({ navigator, currentRoute }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={currentRoute === 'Home' ? styles.current : styles.button}
        onPress={() => navigator.navigate('Home')}
      >
        <Text>🏠</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={currentRoute === 'Profile' ? styles.current : styles.button}
      >
        <Text>👤</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={currentRoute === 'Publish' ? styles.current : styles.button}
        onPress={() => navigator.navigate('Publish')}
      >
        <Text>➕</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={currentRoute === 'Explore' ? styles.current : styles.button}
        onPress={() => navigator.navigate('Explore')}
      >
        <Text>🌐</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={currentRoute === 'Settings' ? styles.current : styles.button}
        onPress={() => navigator.navigate('Settings')}
      >
        <Text>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    elevation: 4,
    borderColor: '#f0f0f0',
    borderTopWidth: 1,
    textAlignVertical: 'top',
  },
  button: {
    borderColor: 'red',
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  current: {
    borderColor: 'red',
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#aaddff',
    elevation: 8,
  },
});

export default Navbar;

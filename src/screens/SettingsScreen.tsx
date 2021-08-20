import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../components/Navbar';
import { useTokenStore } from '../hooks/useTokenStore';
import { useUserStore } from '../utils/userStore';

const SettingsScreen = ({ navigation }: any) => {
  const deleteToken = useTokenStore((state) => state.delete);
  const signoutUser = useUserStore((state) => state.signout);

  const handleSignOut = async () => {
    await deleteToken();
    signoutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut} style={styles.element}>
        <Text>Sign out from the app</Text>
      </TouchableOpacity>
      <Navbar navigator={navigation} currentRoute="Settings" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  element: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    borderColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  navbar: {
    alignItems: 'flex-end',
  },
});

export default SettingsScreen;

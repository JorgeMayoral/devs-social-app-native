import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { login } from '../services/authServices';

const SignInScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const result = await login({ username, password });

    if (result) {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <CustomTextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="username"
        keyboardType="default"
        style={styles.input}
      />
      <CustomTextInput
        placeholder="Password"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <CustomButton text="Sign In" onPress={() => handleSubmit()} />
      <View style={styles.row}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={styles.link}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 21,
    color: 'blue',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    borderColor: '#ababab',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default SignInScreen;

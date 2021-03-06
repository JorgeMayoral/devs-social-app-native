import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { register } from '../services/authServices';
import { useUserStore } from '../hooks/useUserStore';

const SignUpScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUserState = useUserStore((state) => state.fetch);

  const handleSubmit = async () => {
    setError('');
    const result = await register({ username, name, email, password });

    if (result) {
      await setUserState();
      navigation.replace('Home');
    } else {
      setError('Something went wrong, try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an account</Text>
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        autoCapitalize="words"
        autoCompleteType="name"
        textContentType="name"
        keyboardType="default"
        style={styles.input}
      />
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        returnKeyType="next"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CustomButton text="Sign In" onPress={() => handleSubmit()} />
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
          <Text style={styles.link}>Sign in</Text>
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
  error: {
    color: 'red',
    paddingBottom: 20,
  },
});

export default SignUpScreen;

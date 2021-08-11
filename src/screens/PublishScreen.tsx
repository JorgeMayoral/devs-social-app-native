import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { publishPost } from '../services/postServices';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import Navbar from '../components/Navbar';

const PublishScreen = ({ navigation }: any) => {
  const [body, setBody] = useState('');

  const handleSubmit = async () => {
    const result = await publishPost({ body });

    if (result) {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <CustomTextInput
          placeholder="Write here your post..."
          value={body}
          onChangeText={setBody}
          returnKeyType="done"
          autoCapitalize="sentences"
          autoCompleteType="off"
          textContentType="none"
          keyboardType="default"
          multiline
          style={styles.input}
        />
        <CustomButton text="Publish post" onPress={handleSubmit} />
      </View>
      <Navbar navigator={navigation} currentRoute="Publish" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    borderColor: '#ababab',
    borderWidth: 1,
    height: 200,
  },
});

export default PublishScreen;

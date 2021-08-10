import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  errorText?: string;
  description?: string;
}

const CustomTextInput = ({
  errorText,
  description,
  ...props
}: CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} selectionColor="blue" {...props} />
      {description && !errorText ? <Text>{description}</Text> : null}
      {errorText ? <Text>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    borderColor: '#ababab',
    borderWidth: 1,
  },
  description: {
    fontSize: 13,
    color: 'gray',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
});

export default CustomTextInput;

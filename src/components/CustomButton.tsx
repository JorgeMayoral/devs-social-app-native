import React from 'react';
import { StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  text?: string;
}

const CustomButton = ({ text, ...props }: CustomButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 5,
  },
  text: {
    color: 'white',
  },
});

export default CustomButton;

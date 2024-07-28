import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const SubmitButton = ({ onPress, isLoading, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{isLoading ? '...' : title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    height: 50,
    marginHorizontal: 100,
    borderRadius: 60,
    marginTop: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default SubmitButton;

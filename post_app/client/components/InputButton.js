import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const InputButton = ({ label, value, onChangeText, secureTextEntry, keyboardType, autoComplete }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  label: {
    marginBottom: 10,
    color: '#1e2225',
  },
  input: {
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingLeft: 10,
    color: '#af9f85',
  },
});

export default InputButton;

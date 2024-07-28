import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import InputButton from '../components/InputButton';
import SubmitButton from '../components/submitButton';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const submitHandle = async () => {
  try {
    setIsLoading(true);
    if (!name || !email || !pw) {
      setIsLoading(false);
      return Alert.alert('Please fill all fields');
    }

    // Log the payload being sent to the server
    console.log('Request Payload:', { name, email, password: pw });

    const response = await axios.post('/auth/register', {
      name,
      email,
      password: pw,
    });

    // Check and log the response from the server
    console.log('Server Response:', response.data);

    Alert.alert(response.data.message);
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error Response:', error.response.data);
    Alert.alert(error.response.data.message);
    setIsLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>REGISTER</Text>
      <View>
        <InputButton label="Name" value={name} onChangeText={text => setName(text)} />
        <InputButton label="Email" value={email} onChangeText={text => setEmail(text)} keyboardType="email-address" autoComplete="email" />
        <InputButton label="Password" value={pw} onChangeText={text => setPw(text)} secureTextEntry={true} autoComplete="password" />
      </View>
      <SubmitButton onPress={submitHandle} isLoading={isLoading} title="Submit" />
      <TouchableOpacity>
        <Text style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e1d5c9',
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e2225',
    marginBottom: 20,
  },
  loginButton: {
    textAlign: 'center',
    marginTop: 20,
    color: '#1e2225',
  },
});

export default RegisterScreen;

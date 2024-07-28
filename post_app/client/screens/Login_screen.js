import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import InputButton from '../components/InputButton';
import SubmitButton from '../components/submitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext';

const LoginScreen = ({ navigation }) => {
  const { state, setState } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const SubmitHandle = async () => {
    try {
      if (!email || !pw) {
        return Alert.alert('Please fill all fields');
      }
      setIsLoading(true);

      // Log the payload being sent to the server
      console.log('Request Payload:', { email, password: pw });

      const response = await axios.post('/auth/login', {
        email,
        password: pw,
      });

      // Check and log the response from the server
      console.log('Server Response:', response.data);
      Alert.alert(response.data.message);
      setState(response.data)
      await AsyncStorage.setItem('@auth', JSON.stringify(response.data));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error Response:', error.response ? error.response.data : error.message);
      Alert.alert(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getLocalStorage = async () => {
      let data = await AsyncStorage.getItem('@auth');
      console.log('Local storage =>', data);
    };
    getLocalStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>LOGIN</Text>
      <View>
        <InputButton label="Email" value={email} onChangeText={text => setEmail(text)} keyboardType="email-address" autoComplete="email" />
        <InputButton label="Password" value={pw} onChangeText={text => setPw(text)} secureTextEntry={true} autoComplete="password" />
      </View>
      <SubmitButton onPress={SubmitHandle} isLoading={isLoading} title="Submit" />
      <TouchableOpacity>
        <Text style={styles.LoginButtonStyle} onPress={() => navigation.navigate('Register')}>
          Register
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
  LoginButtonStyle: {
    textAlign: 'center',
    marginTop: 20,
    color: '#1e2225',
  },
});

export default LoginScreen;

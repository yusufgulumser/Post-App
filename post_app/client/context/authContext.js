import React, { createContext,useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) =>{
    const [state, setState] = useState({
        user:null,
        token:"",
});

    useEffect(() => {
        const getLocalStorage = async () => {
            let data = await AsyncStorage.getItem('@auth');
            let loginData = data? JSON.parse(data):null;
            setState({...state,user:loginData.user,token:loginData.token});
        };
        getLocalStorage();
    }, []);

    axios.defaults.headers.common['Authorization'] = `Bearer ${state?.token}`;
    axios.defaults.baseURL ="http://192.168.1.35:8080/api/v1"

    return (
        <AuthContext.Provider value={{ state, setState }}>
            {children}
        </AuthContext.Provider>
    );

}

export { AuthContext, AuthProvider };

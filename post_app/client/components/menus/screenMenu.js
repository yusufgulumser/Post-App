import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home';
import LoginScreen from '../../screens/Login_screen';
import RegisterScreen from '../../screens/Register_screen';
import HeaderMenu from './headerMenu';
import { AuthContext } from '../../context/authContext';
import PostScreen from '../../screens/postScreen';
import AboutScreen from '../../screens/AboutScreen';
import AccountScreen from '../../screens/AccountScreen';
import Myposts from '../../screens/MyPostsScreen';


const ScreenMenu = () => {
  const Stack = createNativeStackNavigator();
  const {state} = useContext(AuthContext);
  const authenticated = state?.token && state?.user;
  
  return (
    <Stack.Navigator initialRouteName="Login">
      {authenticated ? (
        <>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: "Post App", 
            headerRight: () => <HeaderMenu/> 
          }} 
        />
        <Stack.Screen 
          name="Post" 
          component={PostScreen} 
          options={{ 
            headerBackTitle:"Back",
            headerRight: () => <HeaderMenu/> 
          }} 
        />
        <Stack.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ 
            headerBackTitle:"Back", 
            headerRight: () => <HeaderMenu/> 
          }} 
        />
        <Stack.Screen 
          name="MyPosts" 
          component={Myposts} 
          options={{ 
            headerBackTitle:"Back", 
            headerRight: () => <HeaderMenu/> 
          }} 
        />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;


import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'

import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/menus/screenMenu";
import { PostProvider } from './context/postContext';



export default function App() {
  const Stack= createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
        <PostProvider>
        <ScreenMenu/>
        </PostProvider>
      </AuthProvider>
    </NavigationContainer>
    
  );
}


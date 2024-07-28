import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'


const HeaderMenu = () => {
    const {state,setState}=useContext(AuthContext);
    const handleLogOut=async ()=>{
        setState({token:"",user:null})
        await AsyncStorage.removeItem('@auth')
        alert("Logged out successfully")
    }
  return (
    <View>
      <TouchableOpacity onPress={handleLogOut}>
        <FontAwesome5Icon name="sign-out-alt" color={"red"} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        margin:10,
        justifyContent:"space-between"
    },
    iconStyle:{
        marginBottom:3,
        alignSelf:"center",
        fontSize:25
      }
})

export default HeaderMenu
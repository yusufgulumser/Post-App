import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/menus/footerMenu';

const AboutScreen = () => {
  return (
    <View style={style.container} >
      <View style={{flex:1,justifyContent:"flex-end"}}>
        <FooterMenu/>
      </View>
    </View>
  )
}
const style=StyleSheet.create({
    container:{
        flex:1,
        margin:10,
        justifyContent:'center',
        marginTop:40
        
    }
})

export default AboutScreen
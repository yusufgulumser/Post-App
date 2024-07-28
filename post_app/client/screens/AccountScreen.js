import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/menus/footerMenu';

const AccountScreen = () => {
  const { state, setState } = useContext(AuthContext);
  const [name, setName] = useState(state.user?.name);
  const [password, setPassword] = useState(state.user?.password);
  const [email] = useState(state.user?.email);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        password,
        email,
      });
      setLoading(false);
      setState((prevState) => ({
        ...prevState,
        user: data.updatedUser,
      }));
      alert(data.message);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={style.container} >
      <View style={{alignItems:"center"}}>
        <Image source={{uri:"https://cdn-icons-png.freepik.com/512/219/219986.png"}} style={{height:200,width:200,borderRadius:100}}/>
      </View >
      <Text style={style.warnText}>You can only edit your name and password</Text>
      <View style={style.inputContainer}>
        <Text style={style.inputText}>Name</Text>
        <TextInput
          style={style.inputBox}
          value={name} 
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={style.inputText}>Email</Text>
        <TextInput style={style.inputBox} value={email} editable={false} />
      </View>
      <View style={style.inputContainer}>
        <Text style={style.inputText}>Password</Text>
        <TextInput
          style={style.inputBox}
          value={password} 
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={style.inputContainer}>
        <Text style={style.inputText}>Role</Text>
        <TextInput
          style={style.inputBox}
          value={state.user?.role}
          editable={false}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={style.updateBtn} onPress={handleUpdate}>
          <Text style={style.updateBtnText}>
            {loading ? "Please Wait" : "Update Profile"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:1,justifyContent:"flex-end"}}>
        <FooterMenu/>
      </View>
    </View>
  );
}

const style=StyleSheet.create({
  container:{
    flex:1,
    margin:10,
    justifyContent:'center',
    marginTop:40
  },
  warnText:{
    color:"red",
    fontSize:20
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 16,
  },
})

export default AccountScreen;

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button, Card, Paragraph, Avatar } from 'react-native-paper';
import { auth, singInWithGoogle } from '../services/firebase';
import HomePage from './HomePage'

const Login = () =>{
  const [userID, setuserID] = useState(localStorage.getItem('id'));
  const sair = () => {
    localStorage.clear()
    setuserID(null)
  }
    const handleLogin = () => {
    singInWithGoogle()
      .then(result => {
        //Pega o ID unico por usuario
        setuserID(result.user.uid);
        localStorage.setItem('id', result.user.uid);
        localStorage.setItem('profile', result.user.photoURL);
        localStorage.setItem('name', result.user.displayName);
      })
  }
    return(
        <View style={styles.login}>
        { !userID ? (
            <View style={styles.login}>
              <Image
              style={styles.logo}
              source={{uri: 'https://static.vecteezy.com/system/resources/previews/001/205/599/non_2x/bird-png.png',}}
              />
              <Text style={{fontSize: 30, margin: 10}}>
                Bem vindo ao Sparrow,
              </Text>
              <Text style={{fontSize: 15}}>
                faça seu login abaixo.
              </Text>
               
              <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}>
              <Text>Login com a conta do Google</Text>
              </TouchableOpacity>
            </View>
            ) : (<View style={styles.container}>
            <HomePage/>
            <TouchableOpacity
                style={styles.button}
                onPress={sair}>
             <Text>Sair</Text>
            </TouchableOpacity>
            </View>
    )}
        </View>
    )
}
const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
  },
  login: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff5f4",
  },
  logo: {
    marginTop: 100,
    margin: 50,
    width: 100,
    height: 100,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#e8b4b8",
    borderRadius: 20,
    padding: 10,
    margin:50,
    fontFamily: 'Trebuchet MS'
  },

})

export default Login;
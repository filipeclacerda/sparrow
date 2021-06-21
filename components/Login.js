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
        <View >
        { !userID ? (
            <View style={styles.container}>
            <Image
            style={styles.logo}
            source={{uri: 'https://c0.klipartz.com/pngpicture/487/479/gratis-png-silueta-de-aguila-pajaro-fugle.png',}}
            />
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
  logo: {
    width: 300,
    height: 200,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#e8b4b8",
    borderRadius: 20,
    padding: 10,
    fontFamily: 'Trebuchet MS'
  },

})

export default Login;
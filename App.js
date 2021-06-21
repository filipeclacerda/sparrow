import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Login from './components/Login'
import { Button, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { getDatabase, ref, set } from "firebase/database";
import firebase from './services/firebase'
export default function App() {
let userID

  const teste = () => {
    localStorage.clear()
  }

const db = firebase.getAll();
const [view, setView] = useState('login');
userID =localStorage.getItem('id')

  return (
      <Login/>
  );



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96beff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

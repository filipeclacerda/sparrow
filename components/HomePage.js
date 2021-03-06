import React, { useState } from 'react';
import firebase from '../services/firebase'
import CardQuote from './card.component'
import { useList } from 'react-firebase-hooks/database'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Platform, TextInput, Alert } from 'react-native';
import { Button, Card, Paragraph, Avatar, FAB } from 'react-native-paper';


const styles = StyleSheet.create({
   
    card: {
        backgroundColor: '#67595e',
        margin: 10,
        borderRadius: 20,
        flex: 1,
        width: Platform.OS === 'web' ? '50vh' : windowWidth > 500 ? 500 : windowWidth-20,
        overflow: 'hidden'
    },
    content: {
        flex: 1,
        backgroundColor: '#eed6d3',
        padding: 24,
    },
    actions: {
        backgroundColor: '#e8b4b8',
        justifyContent: 'flex-end',
    },
    quote: {
        fontSize: 35,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        lineHeight: '120%'
    },
    likes: {
        paddingRight: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#e8b4b8",
        borderRadius: 20,
        padding: 10,
        fontFamily: 'Trebuchet MS'
    },
    post: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center'
    },
    input: {
        height: 60,
        flex: 1,
        margin: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'pink',
        padding:15 
  },
});


const HomePage = () => {
    const [cards, loading, error] = useList(firebase.getAll().ref()) 
    const reversedCards = cards.reverse()
    const [input, setInput] = useState('');
    const handlePost = () =>{
        if(input != ''){
            makePost(localStorage.getItem('id'), localStorage.getItem('profile'), input, localStorage.getItem('name'))
        }
        else{
             alert('digite algo antes de enviar')
        }
    }
    const db = firebase.getAll();
    function makePost(userID, profile, input, name){
        var d = new Date();
        var n = d.getTime().toString();
        db.ref(n).set({
        ref: n,
        autor: name,
        texto: input,
        likedBy: [
            0: false,
        ],
        profile_picture : profile,
        likes: 0
        })
        .then(() => {
            setInput('')
        })
        .catch((error) => {

        });
    }
    function checkLike(userID, ref, likedBy){
        if(likedBy[userID] == true){
            console.log(likedBy[userID])
            //setLikeButton('heart')
        }
        
    }
    let userID = localStorage.getItem('id')
    const handleText = (text) => {
        setInput(text)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.post}>
            <TextInput
                multiline
                numberOfLines={4}
                value={input}
                style={styles.input}
                onChangeText={handleText}
                placeholder="Fala com a gente"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handlePost} 
            ><Text>POSTAR</Text>
            </TouchableOpacity>
            </View>
            <FlatList
                data={cards}
                keyExtractor={item => item.ref}
                renderItem={({item}) =>
                <CardQuote
                    key={item.val().ref}
                    texto={item.val().texto}
                    autor={item.val().autor}
                    profile_picture={item.val().profile_picture}
                    likes={item.val().likes}
                    referencia={item.val().ref}
                    likedUser={item.val().likedBy[userID]}
                    
                />
                    }>

                </FlatList>
        </SafeAreaView>
        
        
    )
}

export default HomePage;
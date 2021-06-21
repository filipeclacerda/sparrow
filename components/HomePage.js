import React, { useState } from 'react';
import firebase from '../services/firebase'
import { useList } from 'react-firebase-hooks/database'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Platform, TextInput } from 'react-native';
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
    const [input, setInput] = useState('');
    const handlePost = () =>{
        makePost(localStorage.getItem('id'), localStorage.getItem('profile'), input, localStorage.getItem('name'))
    }
    const db = firebase.getAll();
    function makePost(userID, profile, input, name){
        var d = new Date();
        var n = d.getTime().toString();
        db.ref(n).set({
        ref: n,
        autor: name,
        texto: input,
        profile_picture : profile,
        likes: 0
        })
        .then(() => {
            setInput('')
        })
        .catch((error) => {

        });
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
            >POSTAR
            </TouchableOpacity>
            </View>
            <FlatList
                data={cards}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                    <Card style={styles.card}>
                        <Card.Title title={item.val().autor}
                        titleStyle={{ fontSize: 20, color: '#f9f1f0' }}
                        left={() =>
                            <Avatar.Image size={42} source={{ uri: item.val().profile_picture}}/>
                        } />
                        <Card.Content style={styles.content}>
                            <Paragraph style={styles.quote}>{item.val().texto}</Paragraph>
                        </Card.Content>
                        <Card.Actions style={styles.actions}>
                            <Button 
                                icon= "share-variant"
                                color='#541616'
                                labelStyle={{ fontSize: 24 }}
                            />
                            
                            <Button 
                                icon= {'heart'}
                                color='#541616'
                                labelStyle={{ fontSize: 24 }}
                            >
                            {item.val().likes}
                            </Button>
                            
                                
                        </Card.Actions>
                    </Card>}>

                </FlatList>
        </SafeAreaView>
        
        
    )
}

export default HomePage;
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Platform, TextInput, Alert, Share } from 'react-native';
import { Button, Card, Paragraph, Avatar } from 'react-native-paper';
import firebase from '../services/firebase'

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

const CardQuote = ({ texto, autor, profile_picture, likes, likedUser, referencia }) => {
    const [likeButton, setLikeButton] = useState(likedUser ? "heart" : "heart-outline");
    const db = firebase.getAll();

    const onShare = async () => {
        try {
        const result = await Share.share({
            message:
            autor + ' - ' + texto,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
        } catch (error) {
        alert(error.message);
        }
    };

    return (
        <Card style={styles.card}>
            <Card.Title title={autor}
            titleStyle={{ fontSize: 20, color: '#f9f1f0' }}
            left={() =>
                <Avatar.Image size={42} source={{ uri: profile_picture}}/>
            } />
            <Card.Content style={styles.content}>
                <Paragraph style={styles.quote}>{texto}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                <Button 
                    icon= "share-variant"
                    color='#541616'
                    labelStyle={{ fontSize: 24 }}
                    onPress={onShare}
                />
                <Button 
                    icon= {likeButton}
                    color='#541616'
                    labelStyle={{ fontSize: 24 }}
                    onPress={() => {
                        let ref1 = referencia.toString()
                        if(likeButton == "heart-outline"){
                            db.ref(ref1).update({
                                likes: likes + 1
                                })
                            .then(() => {
                                    setLikeButton("heart")
                                })
                            let userID = localStorage.getItem('id')
                            db.ref(ref1+'/likedBy').update({
                                [userID]: true
                                })  
                        }else{
                            db.ref(ref1).update({
                                likes: likes - 1
                                })
                            .then(() => {
                                    setLikeButton("heart-outline")
                                })
                            let userID = localStorage.getItem('id')
                            db.ref(ref1+'/likedBy').update({
                                [userID]: false
                                })     
                        }   
                    }}
                >
                {likes}
                </Button>
                
                    
            </Card.Actions>
        </Card>

    )
}
    export default CardQuote;
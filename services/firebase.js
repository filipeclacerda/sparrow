import firebase from 'firebase/app';
import 'firebase/firebase-database'
import { getAuth, setPersistence, signInWithRedirect, inMemoryPersistence, GoogleAuthProvider } from "firebase/auth";

//Importante importar o serviço de auth
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyD-7zT1yhQ2vMpQkjqin5xwjFHuqAV8-9g",
  authDomain: "sparrow-b9591.firebaseapp.com",
  databaseURL: "https://sparrow-b9591-default-rtdb.firebaseio.com",
  projectId: "sparrow-b9591",
  storageBucket: "sparrow-b9591.appspot.com",
  messagingSenderId: "1021744331516",
  appId: "1:1021744331516:web:05754ba77544df814af579"
};

firebase.initializeApp(config);

//Iniciar o serviço de auth


const persistence = firebase.auth.Auth.Persistence.LOCAL;

export const auth = firebase.auth();
const db = firebase.database()

const getAll = () => {
      return db
}

//Iniciar o google sing in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

//Exporta a função de login
export const singInWithGoogle = () => auth.signInWithPopup(provider);
export default{
  getAll
}